import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Search, AlertTriangle } from "lucide-react";
import { useShopItems, usePurchaseItem } from "@/lib/useGame";
import { useToast } from "@/hooks/use-toast";
import type { Player, ShopItem } from "@shared/schema";
import woodIcon from "@assets/generated_images/Wood_Resource_Icon_afe312c0.png";
import stoneIcon from "@assets/generated_images/Stone_Resource_Icon_6e496531.png";
import ironIcon from "@assets/generated_images/Iron_Resource_Icon_b2a31277.png";
import potionIcon from "@assets/generated_images/Magic_Potion_Icon_d650536a.png";
import appleIcon from "@assets/generated_images/Food_Apple_Icon_a39eb4d5.png";
import crownIcon from "@assets/generated_images/Crown_Cosmetic_Icon_e01f8049.png";
import staffIcon from "@assets/generated_images/Magic_Staff_Icon_7097861f.png";
import shieldIcon from "@assets/generated_images/Shield_Icon_55e97a7a.png";
import hammerIcon from "@assets/generated_images/Hammer_Tool_Icon_dce5fee4.png";
import boosterIcon from "@assets/generated_images/Time_Booster_Icon_71bc5978.png";

interface ShopPageProps {
  player: Player | null;
}

export default function ShopPage({ player }: ShopPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [transactionMode, setTransactionMode] = useState<"buy" | "sell">("buy");

  const { data: items = [], isLoading, isError, error } = useShopItems();
  const purchaseItem = usePurchaseItem();
  const { toast } = useToast();

  const getIconUrl = (name: string) => {
    const iconMap: Record<string, string> = {
      "Wood": woodIcon,
      "Stone": stoneIcon,
      "Iron": ironIcon,
      "Magic Potion": potionIcon,
      "Apple": appleIcon,
      "Golden Crown": crownIcon,
      "Magic Staff": staffIcon,
      "Shield": shieldIcon,
      "Hammer": hammerIcon,
      "Time Booster": boosterIcon,
    };
    return iconMap[name] || woodIcon;
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransaction = async () => {
    if (!player || !selectedItem) return;

    try {
      await purchaseItem.mutateAsync({
        playerId: player.id,
        itemId: selectedItem.id,
        quantity,
      });
      toast({
        title: "Purchase Successful!",
        description: `Bought ${quantity}x ${selectedItem.name}`,
      });
      setSelectedItem(null);
      setQuantity(1);
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message || "Not enough resources",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-page-title">Marketplace</h1>
        <p className="text-muted-foreground">Buy and sell items with dynamic pricing</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-items"
          />
        </div>
        <Tabs defaultValue="buy" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="buy" onClick={() => setTransactionMode("buy")} data-testid="tab-buy">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" onClick={() => setTransactionMode("sell")} data-testid="tab-sell">
              Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Circuit Breaker Warning */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-sm">Market Protection Active</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Items with high volatility may be temporarily frozen to protect the economy
          </p>
        </div>
      </div>

      {/* Item Grid */}
      {isLoading && (
        <div className="text-center py-12" data-testid="loading-shop">
          <p className="text-muted-foreground">Loading marketplace...</p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="hover-elevate cursor-pointer transition-all duration-200"
            onClick={() => setSelectedItem(item)}
            data-testid={`card-item-${item.id}`}
          >
            <CardHeader className="pb-3">
              <div className="aspect-square bg-muted/30 rounded-md flex items-center justify-center mb-2">
                <img src={item.iconUrl || getIconUrl(item.name)} alt={item.name} className="w-16 h-16 object-contain" />
              </div>
              <CardTitle className="text-sm" data-testid={`text-item-name-${item.id}`}>{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{item.currentPrice}</span>
                {item.priceVolatility !== 0 && (
                  <Badge variant={item.priceVolatility > 0 ? "default" : "secondary"} className="text-xs">
                    {item.priceVolatility > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(item.priceVolatility * 100).toFixed(1)}%
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Stock: {item.stock}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Dialog */}
      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent data-testid="dialog-transaction">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedItem && (
                <>
                  <img src={selectedItem.iconUrl} alt={selectedItem.name} className="w-10 h-10" />
                  <span>{transactionMode === "buy" ? "Buy" : "Sell"} {selectedItem.name}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.description}
              {selectedItem?.category === "cosmetic" && (
                <Badge variant="secondary" className="ml-2 text-xs">Cosmetic Only</Badge>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  max={transactionMode === "buy" ? selectedItem.stock : 999}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  data-testid="input-quantity"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per unit:</span>
                  <span className="font-semibold">{selectedItem.currentPrice} Coins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-lg">{(selectedItem.currentPrice * quantity).toLocaleString()} Coins</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)} data-testid="button-cancel-transaction">
              Cancel
            </Button>
            <Button onClick={handleTransaction} data-testid="button-confirm-transaction">
              Confirm {transactionMode === "buy" ? "Purchase" : "Sale"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
