export interface RequestLoginEntities {
    username:   string;
    password:   string;
    token_name: string;
    pop_id:     number;
}

export interface ResultLogin {
    id:       number;
    name:     string;
    username: string;
    category: CategoryLogin;
    email:    string;
    token:    string;
}

export interface CategoryLogin {
    id:         number;
    name:       string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
