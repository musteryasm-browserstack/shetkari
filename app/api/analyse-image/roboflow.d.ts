declare module "roboflow" {
    export class Roboflow {
        constructor(config: { apiKey: string });
        workspace(): Workspace;
    }

    export class Workspace {
        project(projectName: string): Project;
    }

    export class Project {
        version(versionNumber: number): Version;
    }

    export class Version {
        model: Model;
    }

    export class Model {
        predict(filePath: string, options: { confidence: number }): Promise<PredictionResult>;
    }

    export interface PredictionResult {
        json(): JSON;
    }
}