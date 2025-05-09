import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Ban, UserCheck } from "lucide-react";

// Define the User type
interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	suspended: boolean;
	created_at: string;
}

export default function UserManagement() {
	const [users, setUsers] = useState<User[]>([]); // Use the User type
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select("id, name, email, role, suspended, created_at")
				.order("created_at", { ascending: false });

			if (error) throw error;
			setUsers(data || []); // TypeScript now knows `data` matches the User[] type
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateUserStatus = async (userId: string, suspended: boolean) => {
		try {
			const { error } = await supabase
				.from("profiles")
				.update({ suspended })
				.eq("id", userId);

			if (error) throw error;
			fetchUsers();
		} catch (error) {
			console.error("Error updating user status:", error);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-semibold">User Management</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{user.name}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-500">{user.email}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
										{user.role}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.suspended
												? "bg-red-100 text-red-800"
												: "bg-green-100 text-green-800"
										}`}
									>
										{user.suspended ? "Suspended" : "Active"}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										onClick={() => updateUserStatus(user.id, !user.suspended)}
										className={`flex items-center ${
											user.suspended
												? "text-emerald-600 hover:text-emerald-900"
												: "text-red-600 hover:text-red-900"
										}`}
									>
										{user.suspended ? (
											<>
												<UserCheck className="w-4 h-4 mr-2" />
												Activate
											</>
										) : (
											<>
												<Ban className="w-4 h-4 mr-2" />
												Suspend
											</>
										)}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
