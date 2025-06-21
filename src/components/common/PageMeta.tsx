interface PageMetaProps {
  title: string;
  description: string;
}

const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
  </>
);

// AppWrapper nu mai este necesar, deoarece nu mai folosim HelmetProvider
export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

export default PageMeta;