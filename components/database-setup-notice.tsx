"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, AlertCircle, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DatabaseSetupNotice() {
  const [copiedScript, setCopiedScript] = useState<string | null>(null)

  const scripts = [
    {
      name: "000-verify-setup.sql",
      description: "Verify current database state",
      required: false,
    },
    {
      name: "001-create-businesses-table.sql",
      description: "Create businesses table with indexes and policies",
      required: true,
    },
    {
      name: "002-create-profiles-table.sql",
      description: "Create user profiles table",
      required: true,
    },
    {
      name: "003-create-reviews-table.sql",
      description: "Create reviews table",
      required: true,
    },
    {
      name: "004-insert-sample-data.sql",
      description: "Insert sample business data",
      required: false,
    },
    {
      name: "005-create-functions-and-triggers.sql",
      description: "Create database functions and triggers",
      required: true,
    },
  ]

  const copyToClipboard = (text: string, scriptName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedScript(scriptName)
    setTimeout(() => setCopiedScript(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Database Setup Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>The database tables need to be created before you can use the application.</p>
            <p>Please run the SQL scripts in your Supabase dashboard to set up the required tables.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Setup Steps:</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium">Open Supabase SQL Editor</p>
                  <p className="text-sm text-muted-foreground">Go to your Supabase project → SQL Editor</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium">Run Required Scripts</p>
                  <p className="text-sm text-muted-foreground">Execute scripts 001, 002, 003, and 005 in order</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Refresh Application</p>
                  <p className="text-sm text-muted-foreground">Once complete, refresh this page</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">SQL Scripts:</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {scripts.map((script) => (
                <div
                  key={script.name}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    script.required ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-white px-2 py-1 rounded">{script.name}</code>
                      {script.required && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{script.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        `-- Copy and paste this script name into Supabase SQL Editor:\n-- ${script.name}`,
                        script.name,
                      )
                    }
                    className="ml-4"
                  >
                    {copiedScript === script.name ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Important Notes</p>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  <li>• Run scripts in the order shown above</li>
                  <li>• Script 000 is optional - use it to verify your current setup</li>
                  <li>• Script 004 adds sample data - optional but recommended for testing</li>
                  <li>• If you get errors, try running script 000 first to check your current state</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={() => window.location.reload()} className="flex items-center space-x-2">
              <span>Refresh Page</span>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                Open Supabase Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
