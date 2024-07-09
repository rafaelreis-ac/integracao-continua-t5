import { Route } from "@angular/router";

export class TestUtils {

    static encontrarRotaDoComponente(rotas: Route[], componente: any): string | undefined {

        for (const item of rotas) {

            if (item.component === componente) {
                return item.path || '';
            }

            if (item.children) {
                const rotaFilha = this.encontrarRotaDoComponente(item.children, componente);
                if (rotaFilha !== undefined) {
                    return item.path ? `${item.path}/${rotaFilha}` : rotaFilha;
                }
            }

        }

        return undefined;

    }

}
