import {
  Search, Palette, Code2, Megaphone, TrendingUp, BarChart3, PenTool,
  ShoppingCart, Zap, Target, Eye, Heart, Shield, Lightbulb, Rocket,
  Users, LineChart, Smartphone, Globe, Mail, ArrowRight, Check,
  Star, Award, Briefcase, Camera, Film, Play, Settings, Phone,
  MapPin, Clock, Instagram, Facebook, Linkedin, Music2, Type,
  Layout, Database, FileText, Image, Video, Palette as PaletteIcon,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Search, Palette, Code2, Megaphone, TrendingUp, BarChart3, PenTool,
  ShoppingCart, Zap, Target, Eye, Heart, Shield, Lightbulb, Rocket,
  Users, LineChart, Smartphone, Globe, Mail, ArrowRight, Check,
  Star, Award, Briefcase, Camera, Film, Play, Settings, Phone,
  MapPin, Clock, Instagram, Facebook, Linkedin, Music2, Type,
  Layout, Database, FileText, Image, Video,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Zap;
}

export const availableIcons = Object.keys(iconMap).sort();
