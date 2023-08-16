"use client"
import { sidebarLinks } from "../../constants"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from 'next/image';
function Bottombar(){
    const router=useRouter();
    const pathname=usePathname();
    return (
     
      <section className="bottombar">
        <div className="bottombar_container">
        {sidebarLinks.map((link)=>{
            const isActive=pathname.includes(link.route) || pathname === link.route;
            return(
                <Link href={link.route}
                  key={link.label}
                  className={`bottomsidebar_link ${isActive ? 'bg-primary-500':''}`}
                  >
                    <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
                    <p className="text-subtle-medium text-light-1 max-sm:hidden">
                      {link.label.split(/\+s/)[0]} 
                      </p>
                  </Link>
            )
            }
        )
          }


        </div>

      </section>
    )
  }
  
  export default Bottombar