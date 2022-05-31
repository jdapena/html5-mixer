export function on_volume_changed() {
}

export function list_controls() {
    return new Promise((result, reject) => {
        result([
            { control: "MAIN", volume: 0.5 }
        ]);
    });
}

export function set_volume() {
}
