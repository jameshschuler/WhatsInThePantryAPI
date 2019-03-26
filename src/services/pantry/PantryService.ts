import CreateEditPantryDto from "../../models/dto/pantry/CreateEditPantryDto";
import { Pantry } from "../../models/entity/Pantry";
import PantryUser from "../../models/entity/PantryUser";
import User from "../../models/entity/User";
import { ValidationException } from "../../utils/exceptions/ValidationException";

export interface IPantryService {
  /**
   *
   * @param pantryDto
   * @param user
   */
  create(pantryDto: CreateEditPantryDto, user: User): Promise<void>;

  /**
   *
   * @param pantryId
   * @param user
   */
  getPantry(pantryId: number, user: User): Promise<Pantry>;
}

export class PantryService implements IPantryService {
  public async getPantry(pantryId: number, user: User): Promise<Pantry> {
    const pantry = await Pantry.findOne({
      where: {
        id: pantryId,
        createdBy: user.id
      },
      join: {
        alias: "pantry",
        leftJoinAndSelect: {
          homes: "pantry.pantryItems",
          homeType: "homes.item"
        }
      }
    });

    if (!pantry) {
      throw new ValidationException("NotFoundError", 404, [
        "Pantry not found."
      ]);
    }

    return pantry;
  }

  public async create(
    pantryDto: CreateEditPantryDto,
    user: User
  ): Promise<void> {
    await this.isPantryUnique(pantryDto.name, user);

    const pantry = await Pantry.create({
      name: pantryDto.name,
      isShared: false,
      createdBy: user.id
    }).save();

    await PantryUser.create({
      userId: user.id,
      pantryId: pantry.id,
      isOwner: true,
      canRead: true,
      canWrite: true,
      createdBy: user.id
    }).save();
  }

  /**
   * @description - returns true if the pantry name is unique
   * @param name
   * @param user
   */
  private async isPantryUnique(name: string, user: User): Promise<void> {
    if (user.pantryUsers) {
      for (let pantryUser of user.pantryUsers) {
        const pantry = await Pantry.findOne({ id: pantryUser.pantryId });
        if (!pantry) {
          throw new ValidationException("NotFoundError", 404, [
            `Pantry (${name}) not found.`
          ]);
        }

        if (pantry.name === name) {
          throw new ValidationException("ValidationError", 400, [
            `Pantry name must be unique.`
          ]);
        }
      }
    }
  }
}
