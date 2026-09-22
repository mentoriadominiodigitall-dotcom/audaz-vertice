import { useEffect } from 'react';
import { useContent } from '@/context/ContentContext';

export function useThemeApplier() {
  const { content, loading } = useContent();
  const theme = content.themeSettings;

  useEffect(() => {
    if (loading || !theme) return;

    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.color_primary);
    root.style.setProperty('--color-secondary', theme.color_secondary);
    root.style.setProperty('--color-accent', theme.color_accent);
    root.style.setProperty('--color-button', theme.color_button);
    root.style.setProperty('--color-button-hover', theme.color_button_hover);
    root.style.setProperty('--color-title', theme.color_title);
    root.style.setProperty('--color-text', theme.color_text);
    root.style.setProperty('--color-link', theme.color_link);
    root.style.setProperty('--color-card', theme.color_card);
    root.style.setProperty('--color-background', theme.color_background);
    root.style.setProperty('--color-hover', theme.color_hover);
    root.style.setProperty('--font-display', theme.font_display);
    root.style.setProperty('--font-body', theme.font_body);
    root.style.setProperty('--font-base-size', theme.font_base_size);
    root.style.setProperty('--font-heading-weight', theme.font_heading_weight);
    root.style.setProperty('--font-body-weight', theme.font_body_weight);
    root.style.setProperty('--font-heading-lh', theme.font_heading_line_height);
    root.style.setProperty('--font-body-lh', theme.font_body_line_height);
    root.style.setProperty('--font-letter-spacing', theme.font_letter_spacing);

    document.body.style.fontFamily = `'${theme.font_body}', sans-serif`;
    document.body.style.fontSize = theme.font_base_size;
    document.body.style.backgroundColor = theme.color_background;
    document.body.style.color = theme.color_text;
  }, [theme, loading]);
}
