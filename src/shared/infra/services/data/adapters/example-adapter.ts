import { ExampleAdapterDTO, GetExampleResponseDTO } from "@/shared/infra/dtos"

export function exampleAdapter({error, example}: GetExampleResponseDTO): ExampleAdapterDTO {
    console.log(error)
    return {
        example
    }
}