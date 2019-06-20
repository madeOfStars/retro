class BindingBuilder {
    constructor(builder) {
        this.functions = builder.functions;
        this.component = builder.component;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.functions = [];
            }
            withFunction(funct) {
                this.functions.push(funct)
                return this;
            }
            to(component) {
                this.component = component;
                return this;
            }
            build() {
                const that = this;
                this.functions.forEach(element => {
                    element.bind(that.component);
                })
                return new BindingBuilder(this);
            }
        }
        return Builder;
    }
}

export default BindingBuilder