"use client";
import Link from "next/link";

export default function Forbidden() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-background px-4 py-12 md:px-6">
      <div className="container mx-auto max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-9xl font-bold text-primary">403</div>
          <div>
            <h1 className="text-3xl font-bold">Forbidden</h1>
            <p className="text-muted-foreground">
              Bạn không có quyền truy cập trang này. Vui lòng kiểm tra thông tin
              đăng nhập của bạn hoặc liên hệ với quản trị viên trang web.
            </p>
          </div>
        </div>
        <Link
          href={"/admin"}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Trở về trang chủ
        </Link>
      </div>
    </main>
  );
}
