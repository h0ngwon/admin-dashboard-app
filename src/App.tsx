import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
	CatchAllNavigate,
	DocumentTitleHandler,
	NavigateToResource,
	UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { ForgotPassword } from "./pages/forgotPassword";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { authProvider, dataProvider, liveProvider } from "./providers";

function App() {
	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<AntdApp>
					<DevtoolsProvider>
						<Refine
							dataProvider={dataProvider}
							liveProvider={liveProvider}
							notificationProvider={useNotificationProvider}
							routerProvider={routerBindings}
							authProvider={authProvider}
							resources={resources}
							options={{
								syncWithLocation: true,
								warnWhenUnsavedChanges: true,
								useNewQueryKeys: true,
								projectId: "Xa3vqS-ADkBDc-4E4HsJ",
								liveMode: "auto",
							}}
						>
							<Routes>
								<Route
									element={
										<Authenticated
											key="authenticated-inner"
											fallback={
												<CatchAllNavigate to="/login" />
											}
										>
											<Layout>
												<Outlet />
											</Layout>
										</Authenticated>
									}
								>
									<Route index element={<Home />} />
								</Route>
								<Route
									element={
										<Authenticated
											key="authenticated-outer"
											fallback={<Outlet />}
										>
											<NavigateToResource />
										</Authenticated>
									}
								>
									<Route path="/login" element={<Login />} />
									<Route
										path="/register"
										element={<Register />}
									/>
									<Route
										path="/forgot-password"
										element={<ForgotPassword />}
									/>
								</Route>
							</Routes>
							<RefineKbar />
							<UnsavedChangesNotifier />
							<DocumentTitleHandler />
						</Refine>
						<DevtoolsPanel />
					</DevtoolsProvider>
				</AntdApp>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default App;
