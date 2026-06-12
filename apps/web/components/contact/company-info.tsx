import Link from "next/link"
import { Building2, MapPin, Phone, Mail } from "lucide-react"

export function CompanyInfo() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      {/* Company Info Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-primary/5 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-primary dark:text-foreground pb-3 border-b border-border flex items-center gap-2">
          <Building2 className="h-5 w-5 text-accent-foreground" />
          <span>Contact Information</span>
        </h2>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-primary dark:text-accent" />
            </div>
            <div>
              <p className="font-bold text-secondary dark:text-foreground">Company Address</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed font-sans">
                149C Truong Dinh, Nhieu Loc Ward, District 3, HCMC
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-primary dark:text-accent" />
            </div>
            <div>
              <p className="font-bold text-secondary dark:text-foreground">Hotline Phone</p>
              <Link href="tel:0931613788" className="text-muted-foreground mt-0.5 block hover:text-primary dark:hover:text-accent transition-all font-semibold font-sans">
                0931 613 788
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary dark:text-accent" />
            </div>
            <div>
              <p className="font-bold text-secondary dark:text-foreground">Business Email</p>
              <Link href="mailto:nguyenhainam17052004@gmail.com" className="text-muted-foreground mt-0.5 block hover:text-primary dark:hover:text-accent transition-all font-semibold break-all font-sans">
                nguyenhainam17052004@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-primary/5 flex flex-col h-[320px] lg:flex-1 min-h-[300px]">
        <div className="bg-muted px-6 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider">Location Map</span>
          <Link 
            href="https://maps.google.com/?q=149C+Trương+Định,+phường+Nhiêu+Lộc,+tp+HCM" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[11px] font-bold text-primary dark:text-accent hover:underline"
          >
            View on Google Maps
          </Link>
        </div>
        <iframe
          title="QMaster Office Location Map"
          src="https://maps.google.com/maps?q=149C%20Tr%C6%B0%C6%A1ng%20%C4%90%E1%BB%8Bnh,%20ph%C6%B0%C6%A1ng%20Nhi%C3%AAu%20L%E1%BB%99c,%20tp%20HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full flex-1 border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
