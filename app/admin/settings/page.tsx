"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Globe, Bell, Shield, CreditCard, Database, Users, Building2, Save, RefreshCw } from "lucide-react"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Persian Hub",
    siteDescription: "Discover the best Persian businesses in your area",
    contactEmail: "admin@persianhub.com",
    supportPhone: "+61 400 000 000",

    // Business Settings
    autoApproveBusinesses: false,
    requireBusinessVerification: true,
    allowBusinessPromotions: true,
    maxBusinessImages: 5,
    businessRegistrationFee: 50,

    // User Settings
    allowUserRegistration: true,
    requireEmailVerification: true,
    maxReviewsPerUser: 10,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminNotifications: true,

    // Payment Settings
    stripeEnabled: true,
    paypalEnabled: false,
    currency: "AUD",
    taxRate: 10,

    // System Settings
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    backupFrequency: "daily",
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Settings saved:", settings)
      alert("Settings saved successfully!")
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Error saving settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Admin Settings
          </h1>
          <p className="text-muted-foreground mt-2">Manage your application settings and configurations</p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => handleSettingChange("supportPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoApprove">Auto-approve Businesses</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve new business registrations</p>
                </div>
                <Switch
                  id="autoApprove"
                  checked={settings.autoApproveBusinesses}
                  onCheckedChange={(checked) => handleSettingChange("autoApproveBusinesses", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireVerification">Require Business Verification</Label>
                  <p className="text-sm text-muted-foreground">Require businesses to verify their information</p>
                </div>
                <Switch
                  id="requireVerification"
                  checked={settings.requireBusinessVerification}
                  onCheckedChange={(checked) => handleSettingChange("requireBusinessVerification", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowPromotions">Allow Business Promotions</Label>
                  <p className="text-sm text-muted-foreground">Allow businesses to purchase promoted listings</p>
                </div>
                <Switch
                  id="allowPromotions"
                  checked={settings.allowBusinessPromotions}
                  onCheckedChange={(checked) => handleSettingChange("allowBusinessPromotions", checked)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxImages">Max Business Images</Label>
                  <Input
                    id="maxImages"
                    type="number"
                    value={settings.maxBusinessImages}
                    onChange={(e) => handleSettingChange("maxBusinessImages", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee (AUD)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    value={settings.businessRegistrationFee}
                    onChange={(e) => handleSettingChange("businessRegistrationFee", Number.parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowRegistration">Allow User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={settings.allowUserRegistration}
                  onCheckedChange={(checked) => handleSettingChange("allowUserRegistration", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Require users to verify their email addresses</p>
                </div>
                <Switch
                  id="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="maxReviews">Max Reviews Per User</Label>
                <Input
                  id="maxReviews"
                  type="number"
                  value={settings.maxReviewsPerUser}
                  onChange={(e) => handleSettingChange("maxReviewsPerUser", Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send push notifications to mobile apps</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adminNotifications">Admin Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for admin actions</p>
                </div>
                <Switch
                  id="adminNotifications"
                  checked={settings.adminNotifications}
                  onCheckedChange={(checked) => handleSettingChange("adminNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="stripeEnabled">Stripe Payments</Label>
                  <p className="text-sm text-muted-foreground">Enable Stripe payment processing</p>
                </div>
                <Switch
                  id="stripeEnabled"
                  checked={settings.stripeEnabled}
                  onCheckedChange={(checked) => handleSettingChange("stripeEnabled", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paypalEnabled">PayPal Payments</Label>
                  <p className="text-sm text-muted-foreground">Enable PayPal payment processing</p>
                </div>
                <Switch
                  id="paypalEnabled"
                  checked={settings.paypalEnabled}
                  onCheckedChange={(checked) => handleSettingChange("paypalEnabled", checked)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleSettingChange("taxRate", Number.parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                  {settings.maintenanceMode && <Badge variant="destructive">Active</Badge>}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable debug mode for development</p>
                </div>
                <Switch
                  id="debugMode"
                  checked={settings.debugMode}
                  onCheckedChange={(checked) => handleSettingChange("debugMode", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cacheEnabled">Cache Enabled</Label>
                  <p className="text-sm text-muted-foreground">Enable application caching</p>
                </div>
                <Switch
                  id="cacheEnabled"
                  checked={settings.cacheEnabled}
                  onCheckedChange={(checked) => handleSettingChange("cacheEnabled", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">System Information</span>
                </div>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>Version: 1.0.0</p>
                  <p>Environment: Production</p>
                  <p>Last Backup: 2024-01-20 14:30:00</p>
                  <p>Database Size: 45.2 MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
