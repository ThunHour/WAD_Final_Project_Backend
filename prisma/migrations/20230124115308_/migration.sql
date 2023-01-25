-- DropForeignKey
ALTER TABLE "Cpu" DROP CONSTRAINT "Cpu_panelCpuId_fkey";

-- DropForeignKey
ALTER TABLE "Gpu" DROP CONSTRAINT "Gpu_paneGpulId_fkey";

-- DropForeignKey
ALTER TABLE "MotherBoard" DROP CONSTRAINT "MotherBoard_panelMotherBoardId_fkey";

-- DropForeignKey
ALTER TABLE "PowerSupply" DROP CONSTRAINT "PowerSupply_PanelPowerSupplyId_fkey";

-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_panelStorageId_fkey";

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_paneGpulId_fkey" FOREIGN KEY ("paneGpulId") REFERENCES "PanelGpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_panelCpuId_fkey" FOREIGN KEY ("panelCpuId") REFERENCES "PanelCpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_PanelPowerSupplyId_fkey" FOREIGN KEY ("PanelPowerSupplyId") REFERENCES "PanelPowerSupply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_panelStorageId_fkey" FOREIGN KEY ("panelStorageId") REFERENCES "PanelStorage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotherBoard" ADD CONSTRAINT "MotherBoard_panelMotherBoardId_fkey" FOREIGN KEY ("panelMotherBoardId") REFERENCES "PanelMotherBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
