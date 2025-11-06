import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/GameLayout";
import { Tutorial } from "@/components/Tutorial";
import { FirstDayMissions } from "@/components/FirstDayMissions";
import { TownTemplateSelector } from "@/components/TownTemplateSelector";
import { usePlayer, useCreatePlayer } from "@/lib/useGame";
import CityPage from "@/pages/CityPage";
import ShopPage from "@/pages/ShopPage";
import ArcadePage from "@/pages/ArcadePage";
import PuzzlesPage from "@/pages/PuzzlesPage";
import GovernancePage from "@/pages/GovernancePage";
import DashboardPage from "@/pages/DashboardPage";
import HeistPage from "@/pages/HeistPage";
import NotFound from "@/pages/not-found";

import type { Player } from "@shared/schema";

function Router({ player }: { player: Player | null }) {
  return (
    <Switch>
      <Route path="/">{() => <CityPage player={player} />}</Route>
      <Route path="/shop">{() => <ShopPage player={player} />}</Route>
      <Route path="/arcade">{() => <ArcadePage player={player} />}</Route>
      <Route path="/puzzles">{() => <PuzzlesPage player={player} />}</Route>
      <Route path="/governance">{() => <GovernancePage player={player} />}</Route>
      <Route path="/dashboard">{() => <DashboardPage player={player} />}</Route>
      <Route path="/heist">{() => <HeistPage player={player} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showFirstDayMissions, setShowFirstDayMissions] = useState(false);

  const { data: player, isLoading, isError } = usePlayer(playerId);
  const createPlayer = useCreatePlayer();

  useEffect(() => {
    const savedPlayerId = localStorage.getItem("cityofthreads_player_id");
    if (savedPlayerId) {
      setPlayerId(savedPlayerId);
    } else {
      setShowTemplateSelector(true);
    }
  }, []);

  useEffect(() => {
    if (player && !player.tutorialCompleted) {
      setShowTutorial(true);
    } else if (player && player.firstDayMissionsCompleted < 5) {
      setShowFirstDayMissions(true);
    }
  }, [player]);

  const handleTemplateSelect = async (templateId: string) => {
    const startingResources = {
      starter: { coins: 1000, credits: 100 },
      balanced: { coins: 1500, credits: 75 },
      creator: { coins: 800, credits: 150 },
    }[templateId] || { coins: 1000, credits: 100 };

    try {
      const newPlayer = await createPlayer.mutateAsync({
        username: `Player_${Math.floor(Math.random() * 10000)}`,
        townName: `Town_${Math.floor(Math.random() * 1000)}`,
        townTemplate: templateId,
        coins: startingResources.coins,
        credits: startingResources.credits,
      });

      localStorage.setItem("cityofthreads_player_id", newPlayer.id);
      setPlayerId(newPlayer.id);
      setShowTemplateSelector(false);
      setShowTutorial(true);
    } catch (error) {
      console.error("Failed to create player:", error);
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setShowFirstDayMissions(true);
  };

  const handleTutorialSkip = () => {
    setShowTutorial(false);
    setShowFirstDayMissions(true);
  };

  if (isError && playerId) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center" data-testid="error-loading">
          <h2 className="text-2xl font-display font-bold mb-2 text-destructive">Failed to load player data</h2>
          <p className="text-muted-foreground mb-4">There was an error connecting to the server</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (isLoading || (!player && playerId)) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center" data-testid="loading-initial">
          <h2 className="text-2xl font-display font-bold mb-2">Loading City of Threads...</h2>
          <p className="text-muted-foreground">Initializing your town</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showTemplateSelector && (
        <TownTemplateSelector onSelect={handleTemplateSelect} />
      )}
      {showTutorial && player && (
        <Tutorial onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} />
      )}
      <GameLayout player={player || undefined}>
        <Router player={player} />
      </GameLayout>
      {showFirstDayMissions && <FirstDayMissions />}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
