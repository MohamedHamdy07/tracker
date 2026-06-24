import { StatusPieChart } from "../components/charts/pie-chart";
import { useStatusCounts } from "../hooks/use-status-counts";

export function AnalyticsPage() {
  const { data: statusCounts, isLoading, isError } = useStatusCounts();
  console.log(statusCounts);

  if (isLoading) return <p>Loading statuses</p>;
  if (isError) return <p>Couldn't load statuses.</p>;
  return <StatusPieChart statusCount={statusCounts || []} />;
}
