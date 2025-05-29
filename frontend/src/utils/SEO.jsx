import { Helmet } from 'react-helmet-async';

const SEO = ({title, description}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta
                name='description'
                content={description}
            />
            <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
    )
}

export default SEO;
