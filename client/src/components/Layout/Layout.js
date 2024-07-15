import {Header} from "./Header"
import {Footer} from "./Footer"
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';


export const Layout=({children, title, description, keywords, author})=>{
	return(
	<div>
    <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta charSet="utf-8" />
        <title>{title}</title>
    </Helmet>
    <Header />
      <main style={{minHeight:'70vh'}}>
       <Toaster />
        {children} 
      </main>
    <Footer />
    </div>
	);
};
Layout.defaultProps={
    title:"E-Commerce app - Shop now",
    description:"MERN Stack dev",
    keywords:"mern, ecomm, node",
    author:"SamirWeb"
}
