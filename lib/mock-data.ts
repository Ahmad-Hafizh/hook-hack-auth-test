import { SearchResult } from './types';

export function getMockResults(searchParams: any): SearchResult {
  const genres: Record<string, SearchResult> = {
    skincare: {
      genre: 'Skincare',
      videoType: 'Before → After Comparison Video',
      bgm: {
        genre: 'Upbeat Pop',
        bpm: 120
      },
      averageDuration: 15,
      keyPoints: [
        'Show clear before and after product results in the hook',
        'Present relatable skin concerns in the problem statement',
        'Emphasize limited-time campaign in CTA',
        'Prioritize visual proof over text',
        'Create clean aesthetics with fast-paced editing and bright lighting'
      ],
      storyboard: [
        {
          timeInSeconds: '0-3',
          structure: 'Hook',
          caption: 'Amazing transformation after use',
          script: 'See how your skin can transform in just 1 week!',
          visualInfo: 'Skin before/after footage',
          shootingMethod: 'Macro shot',
          editingEffect: 'Slide transition',
          rtb: '87% of top CVR videos start with Before/After display'
        },
        {
          timeInSeconds: '3-7',
          structure: 'Problem',
          caption: 'Are you struggling with these too?',
          script: 'Dryness, dullness, large pores... nothing seemed to work...',
          visualInfo: 'Close-up of concerned expression',
          shootingMethod: 'Handheld',
          editingEffect: 'Slow motion',
          rtb: 'Relatable problem statements increase watch time by 65%'
        },
        {
          timeInSeconds: '7-12',
          structure: 'Solution',
          caption: 'New ingredient X serum',
          script: 'Our unique X ingredient penetrates deep into your skin',
          visualInfo: 'Product details and ingredient visualization',
          shootingMethod: 'Tripod fixed',
          editingEffect: 'Zoom in',
          rtb: 'Visual explanation of product features increases CVR by 32%'
        },
        {
          timeInSeconds: '12-15',
          structure: 'CTA',
          caption: '20% OFF & Free Shipping Now',
          script: 'Check our profile link now!',
          visualInfo: 'Product and special offer display',
          shootingMethod: 'Overhead shot',
          editingEffect: 'Text animation',
          rtb: 'Limited offer display increases click rate by 54%'
        }
      ],
      insights: {
        hook: [
          {
            title: 'Before/After Effect Visualization',
            description: '87% of top-performing skincare videos show a clear before and after comparison within the first 3 seconds. Split-screen and quick transitions are particularly effective.',
            tags: ['Before/After', 'Transition', 'Visual Proof']
          },
          {
            title: 'Macro Shot Usage',
            description: 'Ultra-close-up shots of skin texture changes demonstrate product effectiveness at a micro level, significantly increasing credibility.',
            tags: ['Macro Photography', 'Texture', 'Detail']
          }
        ],
        problem: [
          {
            title: 'High-Empathy Problem Expression',
            description: 'Problem statements that focus on daily skin concerns create an "I\'m not alone" feeling, making the content more relatable.',
            tags: ['Empathy', 'Emotional Appeal', 'Pain Points']
          },
          {
            title: 'Data-Driven Problem Definition',
            description: 'Using statistics like "X% of people share this concern" emphasizes the universality of the problem and captures viewer attention.',
            tags: ['Data Usage', 'Credibility', 'Social Proof']
          }
        ],
        cta: [
          {
            title: 'Urgency and Scarcity Creation',
            description: 'Using "limited time" and "limited quantity" messaging emphasizes the importance of immediate action. Countdown displays are particularly effective.',
            tags: ['Limited Offer', 'Urgency', 'FOMO']
          },
          {
            title: 'Clear Action Instructions',
            description: 'Specific instructions like "Tap profile link" eliminate confusion and improve conversion rates by providing clear next steps.',
            tags: ['Clear Direction', 'Tap Guide', 'Simplification']
          }
        ]
      }
    },
    makeup: {
      genre: 'Makeup',
      videoType: 'Step-by-Step Tutorial',
      bgm: {
        genre: 'Electro Pop',
        bpm: 110
      },
      averageDuration: 20,
      keyPoints: [
        'Show the final makeup look in the hook',
        'Break down steps into simple, short segments',
        'Demonstrate product texture and color payoff',
        'Use text overlays to emphasize key points',
        'Ensure accurate color representation with proper color correction'
      ],
      storyboard: [
        {
          timeInSeconds: '0-3',
          structure: 'Hook',
          caption: 'Easy 3-Step Glow Up',
          script: 'Can you believe this look takes just 3 minutes?',
          visualInfo: 'Before/After of completed look',
          shootingMethod: 'Face close-up',
          editingEffect: 'Wipe transition',
          rtb: 'Before/After hooks increase engagement by 78%'
        },
        {
          timeInSeconds: '3-7',
          structure: 'Problem',
          caption: 'Quick but flawless makeup method',
          script: 'Want perfect makeup even on busy mornings...',
          visualInfo: 'Busy morning scene',
          shootingMethod: 'Handheld',
          editingEffect: 'Speed up',
          rtb: 'Daily scenarios increase watch time by 60%'
        },
        {
          timeInSeconds: '7-15',
          structure: 'Steps',
          caption: 'Step 1: Base / Step 2: Color / Step 3: Finish',
          script: 'First, apply our new X foundation thinly...',
          visualInfo: 'Step-by-step demonstration',
          shootingMethod: 'Overhead & Close-up',
          editingEffect: 'Cut editing & Text overlay',
          rtb: 'Simple 3-step structure improves recall by 45%'
        },
        {
          timeInSeconds: '15-20',
          structure: 'CTA',
          caption: '20% OFF Limited Set Now',
          script: 'Try this easy makeup routine yourself!',
          visualInfo: 'Product set and QR code',
          shootingMethod: 'Overhead shot',
          editingEffect: 'Product highlight',
          rtb: 'Set discount increases conversion rate by 38%'
        }
      ],
      insights: {
        hook: [
          {
            title: 'Dramatic Transformation Display',
            description: 'Videos with dramatic "bare face to finished look" transformations in the first 3 seconds achieve highest CVR. The "Is this the same person?" effect is particularly powerful.',
            tags: ['Transformation', 'Change', 'Impact']
          },
          {
            title: 'Simplicity Emphasis',
            description: 'Phrases like "Just X minutes" and "Only X steps" highlighting makeup simplicity capture interest and increase watch-through rates.',
            tags: ['Time-Saving', 'Easy', 'Beginner-Friendly']
          }
        ],
        problem: [
          {
            title: 'Daily Scenario Visualization',
            description: 'Recreating common situations like "busy morning routine" or "makeup touch-ups" creates strong viewer relatability.',
            tags: ['Daily Life', 'Empathy', 'Pain Points']
          },
          {
            title: 'Comparison-Based Problem Statement',
            description: 'Comparing traditional methods with new solutions visually demonstrates time and effort savings, highlighting the solution\'s value.',
            tags: ['Comparison', 'Time-Saving', 'Efficiency']
          }
        ],
        cta: [
          {
            title: 'Final Look Reconfirmation',
            description: 'Showing the beautiful final look again just before CTA while implying "you can achieve this too" increases purchase intent.',
            tags: ['Ideal Image', 'Result Check', 'Self-Projection']
          },
          {
            title: 'Set Sales Promotion',
            description: 'Set purchases show 38% higher conversion than individual items. The phrase "All items needed for this look" is particularly effective.',
            tags: ['Set Sales', 'Discount', 'Completeness']
          }
        ]
      }
    }
  };

  return genres[searchParams.genre] || genres.skincare;
}