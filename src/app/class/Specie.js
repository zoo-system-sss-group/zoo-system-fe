export class Specie {
  constructor(data) {
    this.Name = data.Name || "";
    this.ScientificName = data.ScientificName || "";
    this.LifeSpan = data.LifeSpan || null;
    this.Description = data.Description || "";
    this.WildDiet = data.WildDiet || "";
    this.Habitat = data.Habitat || "";
    this.Id = data.Id || null;
    this.CreationDate = data.CreationDate || "";
    this.ModificationDate = data.ModificationDate || "";
    this.DeletionDate = data.DeletionDate || null;
    this.IsDeleted = data.IsDeleted || false;
  }
}
