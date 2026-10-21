export interface SlideItem {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  type: 
    | 'cover'
    | 'proposal'
    | 'stj_photo'
    | 'why_brasilia'
    | 'experiences'
    | 'video_memory'
    | 'overview_days'
    | 'day_detail'
    | 'sunday_alternative'
    | 'inclusions'
    | 'hotel_photo'
    | 'travel_app_guide'
    | 'academic_quote'
    | 'investment'
    | 'reservation_steps'
    | 'payment_code'
    | 'team_contact';
  badge?: string;
  dayNumber?: string;
  content?: string[];
  bullets?: string[];
  options?: string[];
  notes?: string; // Presenter talking notes for meetings
}

export type PresentationTheme = 'default' | 'high_contrast' | 'dark_presenter';
