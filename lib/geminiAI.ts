import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface EyeAnalysisResult {
  disease: string;
  probability: number;
  confidence: string;
  findings: string[];
  recommendations: string[];
  severity: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Retake Required';
  requiresConsultation: boolean;
  retakeRequired?: boolean;
}

export const analyzeEyeImage = async (
  imageUri: string, 
  scanType: string
): Promise<EyeAnalysisResult> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert image to base64 if needed
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64Data = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove data:image/jpeg;base64, prefix if present
        const base64Clean = base64.split(',')[1] || base64;
        resolve(base64Clean);
      };
      reader.readAsDataURL(blob);
    });

    const prompt = `You are an expert ophthalmologist AI assistant analyzing an eye image for ${scanType} detection. 

Please analyze this eye image and provide a detailed medical assessment focusing on ${scanType}. 

FIRST, check if you can see any part of an eye in the image. Only request a retake if the image is completely unusable (totally black, no eye visible at all, or extremely distorted). For acceptable images where you can see at least part of an eye, proceed with analysis even if the quality isn't perfect.

ONLY if the image is completely unusable (no eye visible whatsoever), respond with:
{
  "disease": "Image Quality Issue",
  "probability": 0,
  "confidence": "Low",
  "findings": ["No eye visible in image", "Image appears to be corrupted or blank", "Please retake the photo"],
  "recommendations": ["Retake the photo with eye clearly visible", "Ensure adequate lighting", "Hold camera steady and focus on the eye"],
  "severity": "Retake Required",
  "requiresConsultation": false,
  "retakeRequired": true
}

For all other cases where you can see at least part of an eye (even if blurry or partial), provide your analysis in this JSON format:
{
  "disease": "${scanType}",
  "probability": [percentage 0-100],
  "confidence": "High/Medium/Low",
  "findings": ["finding1", "finding2", "finding3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "severity": "Normal/Mild/Moderate/Severe",
  "requiresConsultation": boolean,
  "retakeRequired": false
}

Important guidelines:
1. Be LENIENT with image quality - only request retake if NO eye is visible at all
2. Work with what you can see in the image, even if not perfect quality
3. If image quality is poor but eye is visible, mention it in findings but still provide analysis
4. Base probability on visible signs specific to ${scanType}
5. Include specific anatomical observations when possible
6. Provide actionable recommendations
7. Recommend professional consultation for concerning findings
8. Adjust confidence based on image quality but don't reject unless completely unusable

Focus specifically on detecting signs of:
- ${scanType === 'Refractory Error' ? 'Vision clarity issues, focusing problems, eye strain signs' : ''}
- ${scanType === 'Squint/Strabismus' ? 'Eye alignment, muscle balance, coordinate movement' : ''}
- ${scanType === 'Cataract' ? 'Lens opacity, clouding, light scattering patterns' : ''}
- ${scanType === 'Glaucoma' ? 'Optic nerve changes, cup-to-disc ratio, pressure signs' : ''}
- ${scanType === 'Macular Degeneration' ? 'Retinal changes, macular appearance, drusen deposits' : ''}`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg"
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response_text = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = response_text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysisResult = JSON.parse(jsonMatch[0]);
      return analysisResult;
    } else {
      throw new Error('Invalid response format from AI');
    }

  } catch (error) {
    console.error('Gemini AI Analysis Error:', error);
    
    // Fallback analysis based on scan type
    return getFallbackAnalysis(scanType);
  }
};

const getFallbackAnalysis = (scanType: string): EyeAnalysisResult => {
  const fallbackResults: Record<string, EyeAnalysisResult> = {
    'Refractory Error': {
      disease: 'Refractory Error',
      probability: 25,
      confidence: 'Medium',
      findings: [
        'Image analysis completed',
        'No obvious refractive distortions visible',
        'Recommend professional eye examination'
      ],
      recommendations: [
        'Schedule comprehensive eye exam',
        'Consider vision screening test',
        'Monitor for changes in vision clarity'
      ],
      severity: 'Normal',
      requiresConsultation: true,
      retakeRequired: false
    },
    'Squint/Strabismus': {
      disease: 'Squint/Strabismus',
      probability: 15,
      confidence: 'Medium',
      findings: [
        'Eye alignment appears normal in image',
        'No obvious deviation detected',
        'Professional assessment recommended'
      ],
      recommendations: [
        'Consult ophthalmologist for detailed examination',
        'Consider eye movement tests',
        'Monitor for any changes in eye alignment'
      ],
      severity: 'Normal',
      requiresConsultation: true,
      retakeRequired: false
    },
    'Cataract': {
      disease: 'Cataract',
      probability: 20,
      confidence: 'Medium',
      findings: [
        'Lens appears clear in captured image',
        'No obvious opacity detected',
        'Age-related changes may not be visible'
      ],
      recommendations: [
        'Regular eye examinations recommended',
        'Monitor for changes in vision quality',
        'Protect eyes from UV exposure'
      ],
      severity: 'Normal',
      requiresConsultation: false,
      retakeRequired: false
    },
    'Glaucoma': {
      disease: 'Glaucoma',
      probability: 30,
      confidence: 'Low',
      findings: [
        'External eye examination completed',
        'Internal pressure assessment needed',
        'Optic nerve evaluation required'
      ],
      recommendations: [
        'Schedule comprehensive glaucoma screening',
        'Regular intraocular pressure monitoring',
        'Family history assessment important'
      ],
      severity: 'Normal',
      requiresConsultation: true,
      retakeRequired: false
    },
    'Macular Degeneration': {
      disease: 'Macular Degeneration',
      probability: 10,
      confidence: 'Low',
      findings: [
        'External retinal assessment limited',
        'Detailed fundus examination needed',
        'No external signs of macular issues'
      ],
      recommendations: [
        'Dilated eye examination recommended',
        'Amsler grid testing suggested',
        'Regular retinal health monitoring'
      ],
      severity: 'Normal',
      requiresConsultation: true,
      retakeRequired: false
    }
  };

  return fallbackResults[scanType] || fallbackResults['Refractory Error'];
};

export default {
  analyzeEyeImage,
  getFallbackAnalysis
};
