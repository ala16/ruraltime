import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Facebook, Instagram, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export const ShareButtons = ({ url, title, description }: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
  
  const shareText = description ? `${title} - ${description}` : title;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copiado!");
    setIsOpen(false);
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + fullUrl)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank');
    setIsOpen(false);
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have a direct share URL, so we copy the link and show a message
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copiado! Cole na bio ou stories do Instagram");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 w-full bg-background hover:bg-accent"
        >
          <Share2 className="w-4 h-4" />
          Compartilhar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-background border-2 shadow-lg z-50" align="center">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold mb-2 text-foreground">Compartilhar</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="justify-start gap-2 bg-background hover:bg-accent border-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Link
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareWhatsApp}
            className="justify-start gap-2 bg-green-50 border-2 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareFacebook}
            className="justify-start gap-2 bg-blue-50 border-2 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareInstagram}
            className="justify-start gap-2 bg-pink-50 border-2 border-pink-200 text-pink-700 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-pink-900"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
