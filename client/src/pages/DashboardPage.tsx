import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Gamepad2, Share2, ShoppingCart, Trophy } from "lucide-react";
import type { Player } from "@shared/schema";

interface DashboardPageProps {
  player: Player | null;
}

export default function DashboardPage({ player }: DashboardPageProps) {
  const telemetryData = {
    dau: { value: 1247, change: 8.2, trend: "up" },
    sessionLength: { value: 6.3, change: -2.1, trend: "down" },
    microgamePlays: { value: 3456, change: 15.7, trend: "up" },
    microgameShares: { value: 234, change: 12.3, trend: "up" },
    viralCoeff: { value: 1.23, change: 5.4, trend: "up" },
    tlUpgrades: { value: 89, change: -3.2, trend: "down" },
    transactions: { value: 5678, change: 11.5, trend: "up" },
    priceVolatility: { value: 0.08, change: -15.3, trend: "down" },
  };

  const tlDistribution = [
    { level: "TL1-3", count: 456, percentage: 36.6 },
    { level: "TL4-6", count: 398, percentage: 31.9 },
    { level: "TL7-9", count: 267, percentage: 21.4 },
    { level: "TL10-12", count: 126, percentage: 10.1 },
  ];

  const topMicrogames = [
    { id: "1", title: "Sky Runner", plays: 1523, creator: "Alex" },
    { id: "2", title: "Speed Racer", plays: 2341, creator: "Jordan" },
    { id: "3", title: "Block Master", plays: 892, creator: "Sam" },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-page-title">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor city metrics and player activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-metric-dau">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-dau-value">{telemetryData.dau.value.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              {telemetryData.dau.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={telemetryData.dau.trend === "up" ? "text-green-500" : "text-red-500"}>
                {telemetryData.dau.change > 0 ? "+" : ""}{telemetryData.dau.change}%
              </span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-session">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Session (min)</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-session-value">{telemetryData.sessionLength.value}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              {telemetryData.sessionLength.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={telemetryData.sessionLength.trend === "up" ? "text-green-500" : "text-red-500"}>
                {telemetryData.sessionLength.change > 0 ? "+" : ""}{telemetryData.sessionLength.change}%
              </span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-plays">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Microgame Plays</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-plays-value">{telemetryData.microgamePlays.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{telemetryData.microgamePlays.change}%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-transactions">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-transactions-value">{telemetryData.transactions.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{telemetryData.transactions.change}%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-metric-shares">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Microgame Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{telemetryData.microgameShares.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-viral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Viral Coefficient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{telemetryData.viralCoeff.value}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-tl-upgrades">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TL Upgrades (Day)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{telemetryData.tlUpgrades.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-volatility">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Price Volatility (σ/μ)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{(telemetryData.priceVolatility.value * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TL Distribution */}
        <Card data-testid="card-tl-distribution">
          <CardHeader>
            <CardTitle>Town Level Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tlDistribution.map((item) => (
              <div key={item.level} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.level}</span>
                  <span className="text-muted-foreground">{item.count} players ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Microgames */}
        <Card data-testid="card-top-microgames">
          <CardHeader>
            <CardTitle>Top Microgames</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topMicrogames.map((game, index) => (
              <div key={game.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{game.title}</p>
                  <p className="text-xs text-muted-foreground">by {game.creator}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {game.plays} plays
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Player Activity */}
        <Card data-testid="card-player-activity">
          <CardHeader>
            <CardTitle>Player Activity Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Trading
                </span>
                <span className="font-semibold">42%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-1 rounded-full" style={{ width: "42%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Playing Microgames
                </span>
                <span className="font-semibold">28%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-2 rounded-full" style={{ width: "28%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Building
                </span>
                <span className="font-semibold">18%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-3 rounded-full" style={{ width: "18%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Governance
                </span>
                <span className="font-semibold">12%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-4 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Distribution (Gini) */}
        <Card data-testid="card-revenue-distribution">
          <CardHeader>
            <CardTitle>Creator Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">0.42</div>
              <p className="text-sm text-muted-foreground mt-1">Gini Coefficient</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Top 10%</span>
                <span className="font-semibold">65% of revenue</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Top 25%</span>
                <span className="font-semibold">82% of revenue</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bottom 50%</span>
                <span className="font-semibold">8% of revenue</span>
              </div>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              Moderately Equitable
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
