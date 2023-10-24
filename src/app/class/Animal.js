import { Specie } from "./Specie";

export class Animal {
    constructor(data) {
      this.Name = data.Name || "";
      this.Description = data.Description || "";
      this.Weight = data.Weight || null;
      this.Height = data.Height || null;
      this.Image = data.Image || null;
      this.BirthDate = data.BirthDate || "";
      this.SpeciesId = data.SpeciesId || null;
      this.Id = data.Id || null;
      this.CreationDate = data.CreationDate || "";
      this.ModificationDate = data.ModificationDate || "";
      this.DeletionDate = data.DeletionDate || null;
      this.IsDeleted = data.IsDeleted || false;
      
      this.Species = data.Species || {};
  }
}