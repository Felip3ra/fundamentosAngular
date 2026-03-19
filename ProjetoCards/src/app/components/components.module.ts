import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { CardComponent } from "./card/card.component";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonComponent,
        CardComponent
    ],
    exports: [
        ButtonComponent,
        CardComponent
    ]
})
export class ComponentsModule {}
