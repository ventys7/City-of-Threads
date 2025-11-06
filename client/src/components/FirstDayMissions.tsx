import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronUp, ChevronDown, Trophy, Check } from "lucide-react";

interface Mission {
  id: number;
  title: string;
  description: string;
  reward: string;
  progress: number;
  total: number;
  completed: boolean;
}

export function FirstDayMissions() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [missions] = useState<Mission[]>([
    {
      id: 1,
      title: "Place Your First Building",
      description: "Build a shop in your city",
      reward: "50 Coins",
      progress: 1,
      total: 1,
      completed: true,
    },
    {
      id: 2,
      title: "Make a Trade",
      description: "Buy or sell an item in the marketplace",
      reward: "100 Coins",
      progress: 1,
      total: 1,
      completed: true,
    },
    {
      id: 3,
      title: "Create a Microgame",
      description: "Publish your first microgame in the Arcade",
      reward: "Crown Cosmetic",
      progress: 0,
      total: 1,
      completed: false,
    },
    {
      id: 4,
      title: "Solve a Puzzle",
      description: "Complete any spatial puzzle",
      reward: "75 Coins",
      progress: 0,
      total: 1,
      completed: false,
    },
    {
      id: 5,
      title: "Cast Your First Vote",
      description: "Vote on a StoryNet policy proposal",
      reward: "50 Coins + Badge",
      progress: 0,
      total: 1,
      completed: false,
    },
  ]);

  const completedCount = missions.filter((m) => m.completed).length;
  const totalProgress = (completedCount / missions.length) * 100;

  if (isCollapsed) {
    return (
      <div className="fixed bottom-20 md:bottom-4 right-4 z-40">
        <Button
          onClick={() => setIsCollapsed(false)}
          className="shadow-lg"
          data-testid="button-expand-missions"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Missions ({completedCount}/{missions.length})
          <ChevronUp className="h-4 w-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 w-80 z-40" data-testid="container-first-day-missions">
      <Card className="shadow-lg">
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">First Day Missions</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(true)}
              data-testid="button-collapse-missions"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{completedCount}/{missions.length}</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {missions.map((mission) => (
              <Card
                key={mission.id}
                className={`${mission.completed ? "bg-muted/30" : "hover-elevate"}`}
                data-testid={`card-mission-${mission.id}`}
              >
                <CardContent className="pt-3 pb-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        mission.completed ? "bg-primary border-primary" : "border-muted-foreground"
                      }`}
                    >
                      {mission.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${mission.completed ? "line-through text-muted-foreground" : ""}`}>
                        {mission.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{mission.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={mission.completed ? "secondary" : "default"} className="text-xs">
                          {mission.reward}
                        </Badge>
                        {mission.completed && (
                          <Button size="sm" variant="outline" className="h-6 text-xs" data-testid={`button-claim-${mission.id}`}>
                            Claim
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {!mission.completed && (
                    <Progress value={(mission.progress / mission.total) * 100} className="h-1" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
