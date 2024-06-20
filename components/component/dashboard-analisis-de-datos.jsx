'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBullet } from "@nivo/bullet";
import { ResponsiveRadar } from "@nivo/radar";

export default function DashboardAnalisisDeDatos() {
  return (
    <main className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-8">Análisis de Datos</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Horas Trabajadas</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Tasa de Retención</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Análisis de Sentimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Evaluaciones de Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Proyectos Completados</CardTitle>
          </CardHeader>
          <CardContent>
            <BulletChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Rotación de Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedBarChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Promociones Internas</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedBarChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Gastos de Capacitación</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="dark:bg-white">
          <CardHeader>
            <CardTitle className="dark:text-zinc-950">Satisfacción Laboral</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Enero", count: 30 },
          { name: "Febrero", count: 45 },
          { name: "Marzo", count: 50 },
          { name: "Abril", count: 60 },
          { name: "Mayo", count: 70 },
          { name: "Junio", count: 80 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            container: {
              background: "#fff", // Fondo claro para los tooltips
              color: "#333", // Texto oscuro para los tooltips
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
            chip: {
              borderRadius: "9999px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="Un gráfico de barras mostrando datos"
      />
    </div>
  );
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "series1",
            data: [
              { x: "Enero", y: 30 },
              { x: "Febrero", y: 45 },
              { x: "Marzo", y: 50 },
              { x: "Abril", y: 60 },
              { x: "Mayo", y: 70 },
              { x: "Junio", y: 80 },
            ],
          },
        ]}
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            container: {
              background: "#fff", // Fondo claro para los tooltips
              color: "#333", // Texto oscuro para los tooltips
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
            chip: {
              borderRadius: "9999px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        enableLabel={false}
        role="application"
        ariaLabel="Un gráfico de líneas mostrando datos"
      />
    </div>
  );
}

function PieChart(props) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Enero", value: 30 },
          { id: "Febrero", value: 45 },
          { id: "Marzo", value: 50 },
          { id: "Abril", value: 60 },
          { id: "Mayo", value: 70 },
          { id: "Junio", value: 80 },
        ]}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={["#2563eb", "#e11d48", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"]}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              background: "#fff", // Fondo claro para los tooltips
              color: "#333", // Texto oscuro para los tooltips
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        enableLabel={false}
        role="application"
        ariaLabel="Un gráfico de pastel mostrando datos"
      />
    </div>
  );
}

function RadarChart(props) {
  return (
    <div {...props}>
      <ResponsiveRadar
        data={[
          { criterio: "Puntualidad", Juan: 100, Maria: 80, Carlos: 60 },
          { criterio: "Responsabilidad", Juan: 90, Maria: 85, Carlos: 70 },
          { criterio: "Proactividad", Juan: 80, Maria: 75, Carlos: 50 },
          { criterio: "Trabajo en equipo", Juan: 95, Maria: 80, Carlos: 65 },
          { criterio: "Adaptabilidad", Juan: 85, Maria: 70, Carlos: 60 },
        ]}
        keys={["Juan", "Maria", "Carlos"]}
        indexBy="criterio"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        colors={["#2563eb", "#e11d48", "#f59e0b"]}
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        gridLabelOffset={36}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              background: "#fff", // Fondo claro para los tooltips
              color: "#333", // Texto oscuro para los tooltips
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        enableLabel={false}
        role="application"
        ariaLabel="Un gráfico de radar mostrando datos"
      />
    </div>
  );
}

function BulletChart(props) {
  return (
    <div {...props}>
      <ResponsiveBullet
        data={[
          {
            id: "proyectos",
            ranges: [0, 50, 100, 150],
            measures: [110],
            markers: [90],
          },
        ]}
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#777777",
                strokeWidth: 1,
              },
            },
            ticks: {
              line: {
                stroke: "#777777",
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: "#333333",
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#333333",
              },
            },
          },
          grid: {
            line: {
              stroke: "#dddddd",
              strokeWidth: 1,
            },
          },
        }}
        role="application"
        ariaLabel="Un gráfico de bullet mostrando datos"
      />
    </div>
  );
}

function StackedBarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Enero", Juan: 30, Maria: 25 },
          { name: "Febrero", Juan: 45, Maria: 35 },
          { name: "Marzo", Juan: 50, Maria: 40 },
          { name: "Abril", Juan: 60, Maria: 50 },
          { name: "Mayo", Juan: 70, Maria: 60 },
          { name: "Junio", Juan: 80, Maria: 70 },
        ]}
        keys={["Juan", "Maria"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb", "#e11d48"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              background: "#fff", // Fondo claro para los tooltips
              color: "#333", // Texto oscuro para los tooltips
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="Un gráfico de barras apiladas mostrando datos"
      />
    </div>
  );
}
