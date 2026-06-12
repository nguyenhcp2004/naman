import * as React from "react"
import { FileText, Download, ShieldCheck, Wrench } from "lucide-react"
import { Product } from "@/app/product/types"

type TabType = "specs" | "downloads" | "warranty"

interface DetailTabsProps {
  product: Product
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function DetailTabs({ product, activeTab, onTabChange }: DetailTabsProps) {
  return (
    <div className="border border-border rounded bg-card overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-border bg-muted/30">
        <button
          onClick={() => onTabChange("specs")}
          className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "specs"
              ? "border-primary dark:border-accent text-primary dark:text-accent bg-card"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Technical Specifications
        </button>
        <button
          onClick={() => onTabChange("downloads")}
          className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "downloads"
              ? "border-primary dark:border-accent text-primary dark:text-accent bg-card"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Documents & Downloads
        </button>
        <button
          onClick={() => onTabChange("warranty")}
          className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "warranty"
              ? "border-primary dark:border-accent text-primary dark:text-accent bg-card"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Warranty & Service
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "specs" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">General Information</h3>
              <div className="border border-border rounded overflow-hidden divide-y divide-border">
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">Category</div>
                  <div className="col-span-2 text-foreground font-semibold">{product.category}</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs bg-muted/10">
                  <div className="font-bold text-muted-foreground">Model Code</div>
                  <div className="col-span-2 text-foreground font-semibold font-mono">{product.id.toUpperCase()}</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">Equipment Type</div>
                  <div className="col-span-2 text-foreground">{product.name}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Performance & Cooling</h3>
              <div className="border border-border rounded overflow-hidden divide-y divide-border">
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">Temperature Range</div>
                  <div className="col-span-2 text-foreground font-mono font-semibold">{product.tempRange}</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs bg-muted/10">
                  <div className="font-bold text-muted-foreground">Cooling System</div>
                  <div className="col-span-2 text-foreground">Forced Air (Fan-Assisted Vent)</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">Refrigerant Gas</div>
                  <div className="col-span-2 text-foreground font-mono">{product.refrigerant}</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs bg-muted/10">
                  <div className="font-bold text-muted-foreground">Climate Class</div>
                  <div className="col-span-2 text-foreground">Class 5 (Tropical kitchens up to 43°C)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Dimensions & Weight</h3>
              <div className="border border-border rounded overflow-hidden divide-y divide-border">
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">External Dimensions</div>
                  <div className="col-span-2 text-foreground font-mono">{product.dimensions}</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs bg-muted/10">
                  <div className="font-bold text-muted-foreground">Capacity Volume</div>
                  <div className="col-span-2 text-foreground font-semibold">{product.capacity}</div>
                </div>
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">Inner Chamber Build</div>
                  <div className="col-span-2 text-foreground">Smooth radiused corners for easy sanitization</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Electrical specs</h3>
              <div className="border border-border rounded overflow-hidden divide-y divide-border">
                <div className="grid grid-cols-3 p-3 text-xs">
                  <div className="font-bold text-muted-foreground">Power Input Source</div>
                  <div className="col-span-2 text-foreground font-mono">{product.power}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "downloads" && (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Access specification sheets, CAD blueprints, and instructions for building placement and maintenance setup.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Mock download: Technical Specification Sheet PDF triggered.") }}
                className="flex items-center gap-3 p-3 border border-border rounded hover:bg-muted/30 transition-colors group cursor-pointer"
              >
                <FileText className="h-5 w-5 text-primary dark:text-accent shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-foreground truncate group-hover:underline">Spec Sheet (PDF)</span>
                  <span className="block text-[10px] text-muted-foreground">Size: 1.4 MB | Language: EN</span>
                </div>
                <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </a>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Mock download: Installation & Operating Manual PDF triggered.") }}
                className="flex items-center gap-3 p-3 border border-border rounded hover:bg-muted/30 transition-colors group cursor-pointer"
              >
                <FileText className="h-5 w-5 text-primary dark:text-accent shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-foreground truncate group-hover:underline">User Manual (PDF)</span>
                  <span className="block text-[10px] text-muted-foreground">Size: 3.2 MB | Language: EN</span>
                </div>
                <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </a>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Mock download: DXF/CAD technical schematic drawing files triggered.") }}
                className="flex items-center gap-3 p-3 border border-border rounded hover:bg-muted/30 transition-colors group cursor-pointer"
              >
                <FileText className="h-5 w-5 text-primary dark:text-accent shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-foreground truncate group-hover:underline">CAD Drawing (DXF)</span>
                  <span className="block text-[10px] text-muted-foreground">Size: 850 KB | Engineering Layout</span>
                </div>
                <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </a>
            </div>
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4 p-4 border border-border rounded bg-muted/10">
              <ShieldCheck className="h-8 w-8 text-primary dark:text-accent shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">12-Month Commercial Warranty</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All 3Q hospitality equipment is backed by a full 1-year commercial warranty covering mechanical components, digital controllers, and refrigeration assemblies under normal operating conditions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-border rounded bg-muted/10">
              <Wrench className="h-8 w-8 text-primary dark:text-accent shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">Engineering Service Support</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We offer full life-cycle equipment support, replacement parts procurement, and emergency engineering service dispatch options to keep your operations running continuously.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
