"use client"
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div>حدث خطأ، يرجى إعادة المحاولة لاحقًا.
        <Button variant={'secondary'} size={'default'}>اعد المحاولة</Button>
    </div>
  )
}
