-- DropForeignKey
ALTER TABLE "Ram" DROP CONSTRAINT "Ram_panelRamId_fkey";

-- AddForeignKey
ALTER TABLE "Ram" ADD CONSTRAINT "Ram_panelRamId_fkey" FOREIGN KEY ("panelRamId") REFERENCES "PanelRam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
