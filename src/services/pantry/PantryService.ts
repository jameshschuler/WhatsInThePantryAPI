import { PantryDto } from "../../models/dto/pantry/PantryDto";
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
  create(pantryDto: PantryDto, user: User): Promise<Pantry>;

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

  public async create(pantryDto: PantryDto, user: User): Promise<Pantry> {
    const isUnique = await this.isPantryUnique(pantryDto.name, user);

    if (isUnique === false) {
      throw new ValidationException("ValidationError", 400, [
        `Pantry name must be unique.`
      ]);
    }

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

    return pantry;
  }

  /**
   * @description - returns true if the pantry name is unique
   * @param name
   * @param user
   */
  private async isPantryUnique(name: string, user: User): Promise<boolean> {
    if (user.pantryUsers && user.pantryUsers.length > 0) {
      for (let pantryUser of user.pantryUsers) {
        const pantry = await Pantry.findOne({ id: pantryUser.pantryId });
        if (pantry) {
          if (pantry.name === name) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
