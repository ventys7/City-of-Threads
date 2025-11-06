import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";
import type {
  Player,
  Building,
  ShopItem,
  Microgame,
  SpatialPuzzle,
  Policy,
  Heist,
  InsertPlayer,
  InsertBuilding,
  InsertMicrogame,
  InsertSpatialPuzzle,
  InsertPolicy,
  InsertHeist,
} from "@shared/schema";

export function usePlayer(playerId: string | null) {
  return useQuery<Player | null>({
    queryKey: playerId ? ["/api", "players", playerId] : [],
    enabled: !!playerId,
  });
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertPlayer) => {
      const res = await apiRequest("POST", "/api/players", data);
      return res.json();
    },
    onSuccess: (newPlayer) => {
      queryClient.setQueryData(["/api", "players", newPlayer.id], newPlayer);
    },
  });
}

export function useBuildings(playerId: string | null) {
  return useQuery<Building[]>({
    queryKey: playerId ? ["/api", "buildings", "player", playerId] : [],
    enabled: !!playerId,
  });
}

export function useCollectBuilding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ buildingId, playerId }: { buildingId: string; playerId: string }) => {
      const res = await apiRequest("POST", `/api/buildings/${buildingId}/collect`, {});
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api", "buildings", "player", variables.playerId] });
      queryClient.invalidateQueries({ queryKey: ["/api", "players", variables.playerId] });
    },
  });
}

export function useShopItems() {
  return useQuery<ShopItem[]>({
    queryKey: ["/api", "shop", "items"],
  });
}

export function usePurchaseItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ playerId, itemId, quantity }: { playerId: string; itemId: string; quantity: number }) => {
      const res = await apiRequest("POST", "/api/shop/buy", { playerId, itemId, quantity });
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api", "shop", "items"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "players", variables.playerId] });
    },
  });
}

export function useMicrogames() {
  return useQuery<Microgame[]>({
    queryKey: ["/api", "microgames"],
  });
}

export function useMicrogame(microgameId: string | null) {
  return useQuery<Microgame | null>({
    queryKey: microgameId ? ["/api", "microgames", microgameId] : [],
    enabled: !!microgameId,
  });
}

export function useCreateMicrogame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMicrogame) => {
      const res = await apiRequest("POST", "/api/microgames", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "microgames"] });
    },
  });
}

export function usePuzzles() {
  return useQuery<SpatialPuzzle[]>({
    queryKey: ["/api", "puzzles"],
  });
}

export function useCreatePuzzle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertSpatialPuzzle) => {
      const res = await apiRequest("POST", "/api/puzzles", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "puzzles"] });
    },
  });
}

export function useCompletePuzzle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ puzzleId, playerId }: { puzzleId: string; playerId: string }) => {
      const res = await apiRequest("POST", `/api/puzzles/${puzzleId}/complete`, { playerId });
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api", "puzzles"] });
      queryClient.invalidateQueries({ queryKey: ["/api", "players", variables.playerId] });
    },
  });
}

export function usePolicies() {
  return useQuery<Policy[]>({
    queryKey: ["/api", "policies"],
  });
}

export function useCreatePolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertPolicy) => {
      const res = await apiRequest("POST", "/api/policies", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "policies"] });
    },
  });
}

export function useVotePolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ playerId, policyId, vote }: { playerId: string; policyId: string; vote: boolean }) => {
      const res = await apiRequest("POST", `/api/policies/${policyId}/vote`, { playerId, vote });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "policies"] });
    },
  });
}

export function useHeists(playerId: string | null) {
  return useQuery<Heist[]>({
    queryKey: playerId ? ["/api", "heists", "player", playerId] : [],
    enabled: !!playerId,
  });
}

export function useCreateHeist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertHeist) => {
      const res = await apiRequest("POST", "/api/heists", data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api", "heists", "player", variables.player1Id] });
      if (variables.player2Id) {
        queryClient.invalidateQueries({ queryKey: ["/api", "heists", "player", variables.player2Id] });
      }
    },
  });
}

export function useCompleteHeist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ heistId, playerId, success }: { heistId: string; playerId: string; success: boolean }) => {
      const res = await apiRequest("POST", `/api/heists/${heistId}/complete`, { playerId, success });
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api", "heists", "player", variables.playerId] });
      queryClient.invalidateQueries({ queryKey: ["/api", "players", variables.playerId] });
    },
  });
}

export function useLogTelemetry() {
  return useMutation({
    mutationFn: async (event: { playerId: string; eventType: string; eventData: any }) => {
      const res = await apiRequest("POST", "/api/telemetry", event);
      return res.json();
    },
  });
}
