import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, Target, Clock, TrendingDown, Play, MapPin } from "lucide-react";
import type { Player } from "@shared/schema";
import advisorIcon from "@assets/generated_images/Advisor_Character_Portrait_facda006.png";
import knightIcon from "@assets/generated_images/Knight_Character_Portrait_19cf4d02.png";

interface Heist {
  id: string;
  leaderId: string;
  partnerId: string | null;
  status: string;
  targetBuilding: string;
  reward: number;
  reputationRisk: number;
  stealthMeter: number;
}

interface HeistPageProps {
  player: Player | null;
}

export default function HeistPage({ player }: HeistPageProps) {
  const [planningModalOpen, setPlanningModalOpen] = useState(false);
  const [executionModalOpen, setExecutionModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [waypoints, setWaypoints] = useState<number>(0);

  const mockHeist: Heist = {
    id: "1",
    leaderId: "user1",
    partnerId: "user2",
    status: "planning",
    targetBuilding: "Central Vault",
    reward: 5000,
    reputationRisk: 25,
    stealthMeter: 100,
  };

  const availablePartners = [
    { id: "p1", name: "Shadow Runner", specialty: "Stealth", avatar: advisorIcon },
    { id: "p2", name: "Tech Expert", specialty: "Hacking", avatar: knightIcon },
  ];

  const targets = [
    { id: "t1", name: "Central Vault", difficulty: 5, reward: 5000, risk: 25 },
    { id: "t2", name: "Museum Gallery", difficulty: 3, reward: 2500, risk: 15 },
    { id: "t3", name: "Research Lab", difficulty: 4, reward: 3500, risk: 20 },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-page-title">Heist Operations</h1>
        <p className="text-muted-foreground">Plan and execute stealth missions with partners</p>
      </div>

      {/* Active Heist */}
      {mockHeist && (
        <Card className="border-2 border-primary/20" data-testid="card-active-heist">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Operation: {mockHeist.targetBuilding}
                </CardTitle>
                <CardDescription className="mt-2">2-Player Stealth Mission</CardDescription>
              </div>
              <Badge variant={mockHeist.status === "planning" ? "secondary" : "default"}>
                {mockHeist.status.charAt(0).toUpperCase() + mockHeist.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-bold text-primary">{mockHeist.reward.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Coins Reward</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-bold text-destructive">{mockHeist.reputationRisk}%</p>
                    <p className="text-xs text-muted-foreground">Reputation Risk</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-bold">{mockHeist.stealthMeter}%</p>
                    <p className="text-xs text-muted-foreground">Stealth Meter</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {mockHeist.partnerId && (
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="text-sm font-semibold mb-2">Partner</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={advisorIcon} alt="Partner" />
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Shadow Runner</p>
                    <p className="text-xs text-muted-foreground">Stealth Specialist</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            {mockHeist.status === "planning" ? (
              <>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPlanningModalOpen(true)}
                  data-testid="button-edit-plan"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Edit Plan
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setExecutionModalOpen(true)}
                  data-testid="button-start-heist"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Mission
                </Button>
              </>
            ) : (
              <Button className="w-full" data-testid="button-continue-heist">
                Continue Mission
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      {/* Available Targets */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Available Targets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {targets.map((target) => (
            <Card key={target.id} className="hover-elevate" data-testid={`card-target-${target.id}`}>
              <CardHeader>
                <CardTitle className="text-lg" data-testid={`text-target-name-${target.id}`}>
                  {target.name}
                </CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    Difficulty: {target.difficulty}/5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reward:</span>
                    <span className="font-semibold text-primary">{target.reward} Coins</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk:</span>
                    <span className="font-semibold text-destructive">{target.risk}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => setPlanningModalOpen(true)}
                  data-testid={`button-plan-${target.id}`}
                >
                  Plan Heist
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Planning Modal */}
      <Dialog open={planningModalOpen} onOpenChange={setPlanningModalOpen}>
        <DialogContent className="max-w-3xl" data-testid="dialog-planning">
          <DialogHeader>
            <DialogTitle>Heist Planning</DialogTitle>
            <DialogDescription>Coordinate your approach with your partner</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Partner</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePartners.map((partner) => (
                  <Card
                    key={partner.id}
                    className={`hover-elevate cursor-pointer ${
                      selectedPartner === partner.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedPartner(partner.id)}
                    data-testid={`card-partner-${partner.id}`}
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={partner.avatar} alt={partner.name} />
                          <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{partner.name}</p>
                          <p className="text-xs text-muted-foreground">{partner.specialty}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Blueprint View</Label>
              <div className="aspect-video bg-muted/30 rounded-md border-2 border-dashed flex items-center justify-center p-4">
                <div className="text-center space-y-2">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Click to place waypoints</p>
                  <p className="text-xs text-muted-foreground">Waypoints: {waypoints}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setWaypoints(waypoints + 1)}
                    data-testid="button-add-waypoint"
                  >
                    Add Waypoint
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry-time">Your Entry Time</Label>
                <Input id="entry-time" type="time" defaultValue="00:00" data-testid="input-entry-time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-time">Partner Entry Time</Label>
                <Input id="partner-time" type="time" defaultValue="00:05" data-testid="input-partner-time" />
              </div>
            </div>

            <div className="bg-accent/20 p-3 rounded-md flex items-start gap-2">
              <Clock className="h-4 w-4 text-accent-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold">Time-Shifted Planning</p>
                <p className="text-muted-foreground text-xs">
                  Coordinate entry times asynchronously with your partner
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanningModalOpen(false)} data-testid="button-cancel-planning">
              Cancel
            </Button>
            <Button onClick={() => setPlanningModalOpen(false)} data-testid="button-save-plan">
              Save Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Execution Modal */}
      <Dialog open={executionModalOpen} onOpenChange={setExecutionModalOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-execution">
          <DialogHeader>
            <DialogTitle>Heist in Progress</DialogTitle>
            <DialogDescription>Stay stealthy and reach the objective</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="aspect-video bg-gradient-to-br from-muted/50 to-background rounded-md border flex items-center justify-center">
              <div className="text-center space-y-2">
                <Play className="h-16 w-16 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Stealth Mission View</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Stealth Meter</span>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
              <Progress value={100} className="h-2" />

              <div className="bg-muted/30 p-3 rounded-md space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Objectives:</span>
                  <Badge variant="outline">2/5 Complete</Badge>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                    <span>Reach Entry Point</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                    <span>Disable Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    <span className="text-muted-foreground">Access Vault</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExecutionModalOpen(false)} data-testid="button-abort-heist">
              <TrendingDown className="h-4 w-4 mr-2" />
              Abort Mission
            </Button>
            <Button data-testid="button-continue-execution">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
