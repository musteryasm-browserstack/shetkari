"use client"

import { useRef, useState, useEffect } from "react"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import {
  Home,
  Leaf,
  MapPin,
  Maximize2,
  Plus,
  Rotate3D,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { OrbitControls as OrbitControlsImpl } from "three-stdlib" // Import OrbitControls type

// Define types for our farm data
type FarmData = {
  id: number;
  name: string;
  crop: string;
  width: number;
  length: number;
  health: number;
  moisture: number;
  lastIrrigated: string;
}

type FarmPlotProps = {
  position: [number, number, number];
  size: [number, number];
  color: string;
  selected: FarmData | null;
  onClick: () => void;
}

type FarmVisualizationProps = {
  farms: FarmData[];
  selectedPlot: FarmData | null;
  setSelectedPlot: (farm: FarmData | null) => void;
}

type FarmMapViewProps = {
  farms: FarmData[];
  selectedPlot: FarmData | null;
  setSelectedPlot: (farm: FarmData | null) => void;
}

// Sample crop types
const cropTypes = [
  "Wheat", "Corn", "Soybeans", "Rice", "Cotton",
  "Barley", "Oats", "Sorghum", "Sunflower", "Canola"
]

function generateRandomFarmData(): Omit<FarmData, 'id' | 'name' | 'width' | 'length'> {
  const crops = ["Wheat", "Corn", "Soybeans", "Rice", "Cotton"]
  return {
    health: Math.floor(Math.random() * 30) + 70, // 70-100
    moisture: Math.floor(Math.random() * 40) + 50, // 50-90
    lastIrrigated: `${Math.floor(Math.random() * 5)} days ago`,
    crop: crops[Math.floor(Math.random() * crops.length)],
  }
}

function FarmPlot({ position, size, color, selected, onClick }: FarmPlotProps) {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[size[0], 0.1, size[1]]} />
      <meshStandardMaterial color={color} />
      {selected && (
        <Html position={[0, 0.5, 0]}>
          <div className="bg-black/80 text-white p-2 rounded-md text-sm whitespace-nowrap">
            {selected.name} - {selected.crop}
          </div>
        </Html>
      )}
    </mesh>
  )
}

function FarmVisualization({ farms, selectedPlot, setSelectedPlot }: FarmVisualizationProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null) // Specify the correct type for the ref

  const getColorForHealth = (health: number) => {
    if (health > 90) return "#22c55e" // Green
    if (health > 80) return "#84cc16" // Yellow-green
    if (health > 70) return "#eab308" // Yellow
    return "#ef4444" // Red
  }

  // Calculate positions to spread out plots
  const calculatePosition = (index: number, total: number): [number, number, number] => {
    const angle = (index / total) * Math.PI * 2
    const radius = 5 + (total * 0.5)
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ]
  }

  return (
    <div className="relative w-full h-[calc(100vh-200px)] min-h-[500px] rounded-lg overflow-hidden border">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Toggle aria-label="Toggle 3D view" className="bg-background/90 hover:bg-background" pressed>
          <Rotate3D className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle fullscreen" className="bg-background/90 hover:bg-background">
          <Maximize2 className="h-4 w-4" />
        </Toggle>
      </div>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls ref={controlsRef} minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
        <Environment preset="sunset" />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#8d7748" />
        </mesh>

        {/* Farm plots */}
        {farms.map((farm, index) => (
          <FarmPlot
            key={farm.id}
            position={calculatePosition(index, farms.length)}
            size={[farm.width || 3, farm.length || 3]}
            color={getColorForHealth(farm.health)}
            selected={selectedPlot?.id === farm.id ? farm : null}
            onClick={() => setSelectedPlot(farm)}
          />
        ))}

        {/* Tractor */}
        <mesh position={[-1, 0.3, -3]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.4]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Simple buildings */}
        <mesh position={[-8, 0.5, -8]}>
          <boxGeometry args={[2, 1, 2]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        <mesh position={[-8, 1.2, -8]}>
          <coneGeometry args={[1.5, 1, 4]} />
          <meshStandardMaterial color="#854d0e" />
        </mesh>
      </Canvas>

      {selectedPlot && (
        <div className="absolute bottom-4 left-4 right-4 bg-background/95 p-4 rounded-lg border shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{selectedPlot.name}</h3>
            <Button variant="ghost" size="icon" onClick={() => setSelectedPlot(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Crop Type</p>
              <p className="font-medium">{selectedPlot.crop}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="font-medium">{selectedPlot.width * selectedPlot.length} hectares</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Health Score</p>
              <p className="font-medium">{selectedPlot.health}/100</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Soil Moisture</p>
              <p className="font-medium">{selectedPlot.moisture}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Irrigated</p>
              <p className="font-medium">{selectedPlot.lastIrrigated}</p>
            </div>
            <div>
              <Button size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FarmMapView({ farms, setSelectedPlot }: FarmMapViewProps) {
  const getColorForHealth = (health: number) => {
    if (health > 90) return "bg-green-600"
    if (health > 80) return "bg-green-500"
    if (health > 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Calculate positions for 2D view
  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2
    const distance = 0.3 + (total * 0.05)
    return {
      top: `${50 + Math.sin(angle) * distance * 50}%`,
      left: `${50 + Math.cos(angle) * distance * 50}%`,
    }
  }

  return (
    <div className="relative w-full h-[calc(100vh-200px)] min-h-[500px] rounded-lg overflow-hidden border bg-green-50">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Toggle aria-label="Toggle 2D view" className="bg-background/90 hover:bg-background" pressed>
          <MapPin className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle fullscreen" className="bg-background/90 hover:bg-background">
          <Maximize2 className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="w-full h-full p-8 flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-full max-h-[400px] border-4 border-brown-700 rounded-md bg-green-100">
          {farms.map((farm, index) => {
            const position = calculatePosition(index, farms.length)
            return (
              <div
                key={farm.id}
                className={`absolute ${getColorForHealth(farm.health)} rounded-md cursor-pointer hover:opacity-80 flex items-center justify-center`}
                style={{
                  top: position.top,
                  left: position.left,
                  width: `${farm.width * 5}%`,
                  height: `${farm.length * 5}%`,
                  transform: `rotate(${(index % 3) * 5}deg)`,
                }}
                onClick={() => setSelectedPlot(farm)}
              >
                <div className="bg-white/80 px-2 py-1 rounded text-sm font-medium">
                  {farm.name} - {farm.crop}
                </div>
              </div>
            )
          })}

          {/* Farm house */}
          <div className="absolute top-[10%] right-[10%] w-[10%] h-[10%] bg-orange-700 rounded-sm">
            <div
              className="absolute w-[100%] h-[60%] top-[-30%] left-0 bg-orange-900 rounded-t-lg"
              style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
            ></div>
          </div>

          {/* Tractor */}
          <div className="absolute top-[65%] left-[10%] w-[5%] h-[5%] bg-red-600 rounded-sm"></div>

          {/* Compass */}
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
            <div className="relative w-10 h-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xs">N</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-bold text-xs">S</div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 font-bold text-xs">E</div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 font-bold text-xs">W</div>
              <div className="w-[1px] h-full bg-black absolute left-1/2 top-0"></div>
              <div className="w-full h-[1px] bg-black absolute top-1/2 left-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FarmOverview() {
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d")
  const [selectedPlot, setSelectedPlot] = useState<FarmData | null>(null)
  const [farms, setFarms] = useState<FarmData[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newFarm, setNewFarm] = useState<Omit<FarmData, 'id' | 'health' | 'moisture' | 'lastIrrigated'>>({
    name: "",
    crop: "Wheat",
    width: 3,
    length: 3,
  })

  // Load farms from localStorage on component mount
  useEffect(() => {
    const savedFarms = localStorage.getItem("userFarms")
    if (savedFarms) {
      try {
        const parsedFarms = JSON.parse(savedFarms) as FarmData[]
        setFarms(parsedFarms)
      } catch (error) {
        console.error("Error parsing saved farms:", error)
      }
    } else {
      // Initialize with some sample farms if none exist
      const initialFarms: FarmData[] = [
        { id: 1, name: "North Field", ...generateRandomFarmData(), width: 4, length: 3.5 },
        { id: 2, name: "South Field", ...generateRandomFarmData(), width: 5, length: 4.2 },
      ]
      setFarms(initialFarms)
      localStorage.setItem("userFarms", JSON.stringify(initialFarms))
    }
  }, [])

  // Save farms to localStorage whenever they change
  useEffect(() => {
    if (farms.length > 0) {
      localStorage.setItem("userFarms", JSON.stringify(farms))
    }
  }, [farms])

  const handleAddFarm = () => {
    if (!newFarm.name) return

    const farm: FarmData = {
      id: Date.now(),
      ...newFarm,
      ...generateRandomFarmData(),
    }

    setFarms([...farms, farm])
    setNewFarm({
      name: "",
      crop: "Wheat",
      width: 3,
      length: 3,
    })
    setIsDialogOpen(false)
  }

  const handleDeleteFarm = (id: number) => {
    setFarms(farms.filter(farm => farm.id !== id))
    if (selectedPlot?.id === id) {
      setSelectedPlot(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col w-full">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <h1 className="text-xl font-semibold">Farm Overview</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Farm Visualization</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Plot
                </Button>
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "3d" | "2d")} className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="3d">3D View</TabsTrigger>
                    <TabsTrigger value="2d">2D Map</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {farms.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] min-h-[400px] rounded-lg border bg-muted/50">
                <Leaf className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Farms Added Yet</h3>
                <p className="text-muted-foreground mb-4">Get started by adding your first farm plot</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Farm Plot
                </Button>
              </div>
            ) : viewMode === "3d" ? (
              <FarmVisualization
                farms={farms}
                selectedPlot={selectedPlot}
                setSelectedPlot={setSelectedPlot}
              />
            ) : (
              <FarmMapView
                farms={farms}
                selectedPlot={selectedPlot}
                setSelectedPlot={setSelectedPlot}
              />
            )}

            <h2 className="text-2xl font-bold tracking-tight mt-6">Your Farm Plots ({farms.length})</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {farms.map((plot) => (
                <Card key={plot.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plot.name}</CardTitle>
                        <CardDescription>
                          {plot.crop} - {plot.width * plot.length} hectares
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteFarm(plot.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Health:</span>
                        <span className="font-medium">{plot.health}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Moisture:</span>
                        <span className="font-medium">{plot.moisture}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Irrigated:</span>
                        <span className="font-medium">{plot.lastIrrigated}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dimensions:</span>
                        <span className="font-medium">{plot.width}m × {plot.length}m</span>
                      </div>
                      <Button
                        className="w-full mt-2"
                        variant="outline"
                        onClick={() => setSelectedPlot(plot)}
                      >
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Add Farm Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Farm Plot</DialogTitle>
            <DialogDescription>
              Enter details about your farm plot to add it to your overview.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Plot Name
              </Label>
              <Input
                id="name"
                value={newFarm.name}
                onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                className="col-span-3"
                placeholder="North Field"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="crop" className="text-right">
                Crop Type
              </Label>
              <Select
                value={newFarm.crop}
                onValueChange={(value) => setNewFarm({ ...newFarm, crop: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="width" className="text-right">
                Width (meters)
              </Label>
              <Slider
                id="width"
                defaultValue={[newFarm.width]}
                min={1}
                max={10}
                step={0.5}
                onValueChange={(value) => setNewFarm({ ...newFarm, width: value[0] })}
                className="col-span-3"
              />
              <span className="col-start-2 col-span-3 text-sm text-muted-foreground">
                {newFarm.width} meters
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="length" className="text-right">
                Length (meters)
              </Label>
              <Slider
                id="length"
                defaultValue={[newFarm.length]}
                min={1}
                max={10}
                step={0.5}
                onValueChange={(value) => setNewFarm({ ...newFarm, length: value[0] })}
                className="col-span-3"
              />
              <span className="col-start-2 col-span-3 text-sm text-muted-foreground">
                {newFarm.length} meters
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddFarm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Farm Plot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}