"use client";

import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

function RealtimeComponent() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    // جلب البيانات الأولية من جدول posts
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          content
        `);

      if (error) {
        console.error("Error fetching initial data:", error);
      } else {
        setPostsData(data);
      }
    };

    fetchInitialData();

    // الاشتراك في التغييرات في جدول "posts"
    const subscription = supabase
      .from('posts')
      .on('*', (payload) => {
        console.log('Change received!', payload);

        // تحديث البيانات المعروضة بناءً على نوع التغيير
        if (payload.eventType === 'INSERT') {
          setPostsData((prevData) => [...prevData, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setPostsData((prevData) =>
            prevData.map((post) =>
              post.id === payload.new.id ? payload.new : post
            )
          );
        } else if (payload.eventType === 'DELETE') {
          setPostsData((prevData) =>
            prevData.filter((post) => post.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    // تنظيف الاشتراك عند انتهاء المكون
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <div>
      <h2>Realtime Posts Data</h2>
      <pre>{JSON.stringify(postsData, null, 2)}</pre>
    </div>
  );
}

export default RealtimeComponent;
