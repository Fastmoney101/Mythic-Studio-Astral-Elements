import ModulePage, { modules } from "../../components/module-page";

export function generateStaticParams() {
  return Object.keys(modules).map((module) => ({ module }));
}

export default function NestedModuleRoute({
  params
}: {
  params: Promise<{ module: string }>;
}) {
  return <ModulePage params={params} />;
}
