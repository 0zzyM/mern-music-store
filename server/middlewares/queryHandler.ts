import type { Request, Response, NextFunction } from "express";

type IntRule = { type: "int"; min: number; max: number; default: number };
type NumberRule = { type: "number"; min: number; max: number; default: number };
type BoolRule = { type: "boolean" };
type EnumRule = { type: "enum"; values: readonly string[] };
type ListRule = { type: "list"; values: readonly string[]; maxItems: number };
type StringRule = {
  type: "string";
  minLength: number;
  maxLength: number;
  required?: boolean;
};

export type FieldRule =
  | IntRule
  | NumberRule
  | BoolRule
  | EnumRule
  | ListRule
  | StringRule;

export type QuerySpec = Record<string, FieldRule>;

export const validateQuery =
  (spec: QuerySpec) => (req: Request, res: Response, next: NextFunction) => {
    const dto: Record<string, unknown> = {};

    for (const [key, rule] of Object.entries(spec)) {
      const qry = req.query[key];

      // if default is absent like isFeatured shouldn't assign anything
      if (!qry) {
        if ("default" in rule) {
          dto[key] = rule.default;
        } else if ("required" in rule && rule.required) {
          return res.status(400).json({
            message: `Query(${key}) is required`,
          });
        }
        continue;
      }

      if (typeof qry !== "string") {
        return res
          .status(400)
          .json({ message: `Invalid request ${key}, it can only be a string` });
      }

      switch (rule.type) {
        case "int": {
          const parsedQry = parseInt(qry, 10);

          if (Number.isNaN(parsedQry) || parsedQry < rule.min) {
            return res
              .status(400)
              .json({ message: `Invalid request ${key} parameter was called` });
          }

          dto[key] = Math.min(parsedQry, rule.max);

          break;
        }

        case "number": {
          const parsedQry = Number(qry);

          if (Number.isNaN(parsedQry) || parsedQry < rule.min) {
            return res
              .status(400)
              .json({ message: `Invalid ${key} parameter was called` });
          }

          dto[key] = Math.min(parsedQry, rule.max);

          break;
        }

        case "boolean": {
          dto[key] = qry === "true";
          break;
        }

        case "enum": {
          if (rule.values.includes(qry)) {
            dto[key] = qry;
          } else {
            return res
              .status(400)
              .json({ message: `Invalid ${key} parameter was called` });
          }
          break;
        }

        case "list": {
          const items = qry.split(",");
          if (items.length > rule.maxItems) {
            return res.status(400).json({ message: `Too many ${key} values` });
          }
          if (items.some((item) => !rule.values.includes(item))) {
            return res
              .status(400)
              .json({ message: `Invalid ${key} parameter` });
          }
          dto[key] = items;
          break;
        }

        case "string": {
          const trimmed = qry.trim();

          if (trimmed.length < rule.minLength) {
            return res.status(400).json({
              message: `Invalid query: Query needs to have minimum ${rule.minLength} characters`,
            });
          }
          if (trimmed.length > rule.maxLength) {
            return res.status(400).json({
              message: `Invalid query: Query can't have more than ${rule.maxLength} characters`,
            });
          }
          dto[key] = trimmed;
          break;
        }
      }
    }

    req.validatedQuery = dto;

    next();
  };
