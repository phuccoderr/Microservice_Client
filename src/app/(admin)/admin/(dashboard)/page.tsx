"use client";
import PageContainer from "@/components/admin/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCustomers } from "@/hooks/query-customers/useGetAllCustomers";
import { useGetReports } from "@/hooks/query-orders/useGetReports";
import { formatVnd } from "@/utils/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  gross_sales: {
    label: "Doanh thu",
  },
  net_sales: {
    label: "Lợi nhuận",
  },
  orders_count: {
    label: "Đơn hàng",
  },
} satisfies ChartConfig;

const AdminPageRedirect = () => {
  const [optionDay, setOptionDay] = useState("last_7_days");
  const { data: chartData } = useGetReports(optionDay);
  const { data: customers } = useGetAllCustomers({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });

  const totalGrossSale = chartData?.reduce(
    (acc, cur) => acc + cur.gross_sales,
    0,
  );
  const totalNetSale = chartData?.reduce((acc, cur) => acc + cur.net_sales, 0);
  const totalOrdersCount = chartData?.reduce(
    (acc, cur) => acc + cur.orders_count,
    0,
  );

  return (
    <PageContainer scrollable>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <Select
            onValueChange={(value) => {
              setOptionDay(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Thống kê" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="last_7_days">7 ngày trước</SelectItem>
                <SelectItem value="last_28_days">28 ngày trước</SelectItem>
                <SelectItem value="last_6_months">6 tháng trước</SelectItem>
                <SelectItem value="last_year">1 năm trước</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
              VND
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatVnd(totalGrossSale ?? 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lợi nhuận</CardTitle>
              VND
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatVnd(totalNetSale ?? 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số đơn hàng bán được
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOrdersCount ?? 0} đơn hàng
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng tài khoản đã đăng ký
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers?.entities.length ?? 0} khách hàng
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="space-y-4">
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px] bg-black"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("vi-VN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  name={"Doanh thu"}
                  fill="#0ea5e9"
                  dataKey="gross_sales"
                  radius={4}
                />
                <Bar
                  name={"Lợi Nhuận 123"}
                  fill="#cbd5e1"
                  dataKey="net_sales"
                  radius={4}
                />
                <Bar
                  name={"Tổng số hoá đơn"}
                  dataKey="orders_count"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminPageRedirect;
