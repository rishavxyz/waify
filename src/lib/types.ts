export interface Post {
	artist: {
		artist_id: number,
		name: string,
		deviant_art?: string,
		pixiv?: string,
		twitter?: string,
		patreon?: string
	},
	byte_size?: number,
	dominant_color?: string,
	extension?: string,
	favorites?: number,
	height?: number,
	width?: number,
	image_id: number,
	is_nsfw: boolean,
	source: string,
	tags: {
		tag_id: number,
		name: string,
		description: string,
		is_nsfw: boolean
	},
	uploaded_at: string,
	url: string
}

