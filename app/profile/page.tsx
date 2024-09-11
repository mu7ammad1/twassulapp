import AuthButton from "@/components/AuthButton";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton
              searchParams={{
                message: searchParams.message,
              }}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
