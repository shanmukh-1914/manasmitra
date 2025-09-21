import { type NextRequest, NextResponse } from "next/server"
import { generateResponse, detectCrisis } from "@/lib/gemini"
import { analyzeCrisisLevel, generateCrisisResponse } from "@/lib/crisis-detection"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Enhanced crisis detection with multiple layers
    const crisisAnalysis = analyzeCrisisLevel(message)
    const geminiCrisisCheck = await detectCrisis(message)

    // Determine if this is a crisis situation
    const isCrisis = geminiCrisisCheck || crisisAnalysis.severity === "high" || crisisAnalysis.severity === "critical"

    // Log crisis events for monitoring
    if (crisisAnalysis.severity !== "low") {
      try {
        await fetch(`${request.nextUrl.origin}/api/crisis-log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            severity: crisisAnalysis.severity,
            message: message.substring(0, 100), // Log only first 100 chars for privacy
            keywords: crisisAnalysis.keywords,
            confidence: crisisAnalysis.confidence,
            actionTaken: crisisAnalysis.recommendedAction,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (logError) {
        console.error("Failed to log crisis event:", logError)
      }
    }

    let response: string

    if (isCrisis) {
      // Use our crisis response system for immediate safety
      response = generateCrisisResponse(crisisAnalysis)
    } else {
      // Use Gemini for regular supportive conversation
      response = await generateResponse(message, context)
    }

    return NextResponse.json({
      response,
      isCrisis,
      crisisLevel: crisisAnalysis.severity,
      confidence: crisisAnalysis.confidence,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
