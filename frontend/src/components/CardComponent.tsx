import React from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface Card {
  id: number;
  name: string;
  email: string;
}

const CardComponent: React.FC<{
  card: Card;
  onDelete: (id: number) => void;
}> = ({ card, onDelete }) => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <p className="text-sm text-gray-500">{card.id}</p>
          <h3 className="font-semibold">{card.name}</h3>
          <p className="text-sm text-gray-500">{card.email}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(card.id)}
            className="hover:bg-red-500 border-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
