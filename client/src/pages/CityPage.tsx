import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ZoomIn, ZoomOut, Hammer, TrendingUp } from "lucide-react";
import { useBuildings, useCollectBuilding } from "@/lib/useGame";
import type { Player, Building } from "@shared/schema";
import townCenterIcon from "@assets/generated_images/Town_Center_Building_Icon_0f5ef54c.png";
import shopIcon from "@assets/generated_images/Shop_Building_Icon_972c33f5.png";
import arcadeIcon from "@assets/generated_images/Arcade_Building_Icon_b23f6908.png";
import puzzleHubIcon from "@assets/generated_images/Puzzle_Hub_Building_Icon_ab695dd2.png";

interface CityPageProps {
  player: Player | null;
}

export default function CityPage({ player }: CityPageProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [buildMode, setBuildMode] = useState(false);

  const { data: buildings = [], isLoading } = useBuildings(player?.id || null);
  const collectBuilding = useCollectBuilding();

  const getBuildingIcon = (type: string) => {
    switch (type) {
      case "town_center": return townCenterIcon;
      case "shop": return shopIcon;
      case "arcade": return arcadeIcon;
      case "puzzle_hub": return puzzleHubIcon;
      default: return townCenterIcon;
    }
  };

  const getBuildingName = (type: string) => {
    return type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/10">
      {/* Map Controls */}
      <div className="absolute top-20 right-4 z-10 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={buildMode ? "default" : "secondary"}
          onClick={() => setBuildMode(!buildMode)}
          data-testid="button-build-mode"
        >
          <Hammer className="h-4 w-4" />
        </Button>
      </div>

      {/* City Map */}
      <div className="flex-1 relative overflow-hidden p-8">
        <div
          className="w-full h-full relative"
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.2s ease-in-out",
          }}
        >
          {/* District Labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <Badge variant="outline" className="text-xs">North District</Badge>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Badge variant="outline" className="text-xs">South District</Badge>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Badge variant="outline" className="text-xs">West District</Badge>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Badge variant="outline" className="text-xs">East District</Badge>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Badge variant="default" className="text-xs">Center</Badge>
          </div>

          {/* Buildings */}
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p className="text-muted-foreground" data-testid="loading-buildings">Loading buildings...</p>
            </div>
          )}
          {buildings.map((building) => (
            <div
              key={building.id}
              className="absolute cursor-pointer hover-elevate active-elevate-2 transition-all duration-200"
              style={{
                left: `${building.positionX}%`,
                top: `${building.positionY}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setSelectedBuilding(building)}
              data-testid={`building-${building.type}`}
            >
              <div className="relative">
                <img
                  src={getBuildingIcon(building.type)}
                  alt={getBuildingName(building.type)}
                  className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
                />
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs">
                  Lv {building.level}
                </Badge>
                {building.upgrading && (
                  <div className="absolute inset-0 bg-primary/20 rounded-md flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Building Detail Panel */}
      {selectedBuilding && (
        <div className="absolute bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 w-11/12 md:w-96 z-20">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <img
                  src={getBuildingIcon(selectedBuilding.type)}
                  alt={getBuildingName(selectedBuilding.type)}
                  className="w-12 h-12"
                />
                <div>
                  <CardTitle className="text-base" data-testid="text-building-name">
                    {getBuildingName(selectedBuilding.type)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Level {selectedBuilding.level}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedBuilding(null)}
                data-testid="button-close-building"
              >
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Production</span>
                  <span className="font-semibold">+100 Coins/hr</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" data-testid="button-collect">
                  Collect
                </Button>
                <Button variant="outline" className="flex-1" data-testid="button-upgrade">
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Build Mode Overlay */}
      {buildMode && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-30">
          <Card className="w-11/12 md:w-96">
            <CardHeader>
              <CardTitle>Build Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Select a building type to place on your city map
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["shop", "arcade", "puzzle_hub"].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4"
                    data-testid={`button-build-${type}`}
                  >
                    <img src={getBuildingIcon(type)} alt={type} className="w-12 h-12" />
                    <span className="text-xs">{getBuildingName(type)}</span>
                  </Button>
                ))}
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setBuildMode(false)}
                data-testid="button-cancel-build"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
