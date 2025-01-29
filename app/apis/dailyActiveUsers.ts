// Here is a sample api configuration that creates an API which serves the daily active users materialized view
import { createConsumptionApi } from "@514labs/moose-lib";

interface DailyActiveUsersParams {
  limit?: number;
  minDailyActiveUsers: number;
}

export default createConsumptionApi<DailyActiveUsersParams>(
  async ({ limit = 10, minDailyActiveUsers }, { client, sql }) => {
    const query = sql`
      SELECT
        date,
        uniqMerge(dailyActiveUsers) as dailyActiveUsers
      FROM DailyActiveUsers
      GROUP BY date
      HAVING dailyActiveUsers >= ${minDailyActiveUsers}
      ORDER BY date
      LIMIT ${limit}`;

    return client.query(query);
  }
);
