import BreadCrumbMe from "@/components/home/bread-crumb";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Header />
      <BreadCrumbMe />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
