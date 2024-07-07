import { CardWrapper } from "@/components/cardWrapper";

export default function page() {
  return (
    <div className="grid place-items-center h-screen bg-radial-gradient">
      <CardWrapper
        headerLabel="About"
        backBtnLabel="Back to Home page"
        backBtnHref="/"
      >
        <div className="space-y-3">
          <p>This is project demo using NextAuth & Prisma library to create a fully authenticated project.</p>
          <p>The project includes a login page, a signup page, public routes that are made accessible even if you
            are not logged in & a dashboard.</p>
          <p>The dashboard consist of controls that an administator can use to manage users of the application.</p>
          <p>But to be honest, the main aim of this page to show that this page is publicly accessible while 
            every other route in the project is protected by default.</p>
        </div>
      </CardWrapper>
    </div>
  )
}