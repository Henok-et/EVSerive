export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			business_verifications: {
				Row: {
					id: string;
					provider_id: string;
					document_url: string;
					status: "pending" | "verified" | "rejected";
					submitted_at: string;
				};
				Insert: {
					id?: string;
					provider_id: string;
					document_url: string;
					status?: "pending" | "verified" | "rejected";
					submitted_at?: string;
				};
				Update: {
					id?: string;
					provider_id?: string;
					document_url?: string;
					status?: "pending" | "verified" | "rejected";
					submitted_at?: string;
				};
			};
		};
		Views: unknown;
		Functions: unknown;
		Enums: unknown;
	};
}
