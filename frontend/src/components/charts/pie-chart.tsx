import { PieChart } from "recharts";
import type { StatusCount } from "../../types";

export function StatusPieChart({
  statusCount,
}: {
  statusCount: StatusCount[];
}) {
  return <PieChart data={statusCount}></PieChart>;
}
